'use client'

import { useState, useCallback, useRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { BugReportFormData } from '@/lib/validations'
import { Evidence, UploadProgress } from '@/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Eye,
  Download,
  Trash2
} from 'lucide-react'
import { cn, generateId, compressImage } from '@/lib/utils'
import { EVIDENCE_TYPES } from '@/lib/constants'

interface EvidenceUploadProps {
  form: UseFormReturn<BugReportFormData>
}

export function EvidenceUpload({ form }: EvidenceUploadProps) {
  const { setValue, watch } = form
  const evidences = watch('evidences') || []
  
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([])
  const [newEvidence, setNewEvidence] = useState<Partial<Evidence>>({
    type: 'IMAGE',
    description: ''
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    await handleFiles(files)
  }, [])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      await handleFiles(files)
    }
  }, [])

  const handleFiles = async (files: File[]) => {
    for (const file of files) {
      const id = generateId()
      const progressItem: UploadProgress = {
        file,
        progress: 0,
        status: 'uploading'
      }
      
      setUploadProgress(prev => [...prev, progressItem])
      
      try {
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setUploadProgress(prev => 
            prev.map(item => 
              item.file === file 
                ? { ...item, progress: i }
                : item
            )
          )
        }
        
        // Compress image if needed
        let processedFile = file
        if (file.type.startsWith('image/')) {
          processedFile = await compressImage(file)
        }
        
        const evidence: Evidence = {
          id,
          description: newEvidence.description || `${getFileTypeLabel(file.type)} - ${file.name}`,
          file: processedFile,
          type: getEvidenceType(file.type),
          size: file.size,
          createdAt: new Date()
        }
        
        setValue('evidences', [...evidences, evidence], { shouldDirty: true })
        
        setUploadProgress(prev => 
          prev.map(item => 
            item.file === file 
              ? { ...item, status: 'completed' }
              : item
          )
        )
        
        // Clear completed uploads after 2 seconds
        setTimeout(() => {
          setUploadProgress(prev => prev.filter(item => item.file !== file))
        }, 2000)
        
      } catch (error) {
        console.error('Error uploading file:', error)
        setUploadProgress(prev => 
          prev.map(item => 
            item.file === file 
              ? { ...item, status: 'error', error: 'Erro no upload' }
              : item
          )
        )
      }
    }
  }

  const removeEvidence = (evidenceId: string) => {
    setValue(
      'evidences',
      evidences.filter(e => e.id !== evidenceId),
      { shouldDirty: true }
    )
  }

  const addUrlEvidence = () => {
    if (newEvidence.description && newEvidence.url) {
      const evidence: Evidence = {
        id: generateId(),
        description: newEvidence.description,
        url: newEvidence.url,
        type: newEvidence.type as Evidence['type'],
        createdAt: new Date()
      }
      
      setValue('evidences', [...evidences, evidence], { shouldDirty: true })
      setNewEvidence({ type: 'IMAGE', description: '', url: '' })
    }
  }

  const getEvidenceType = (mimeType: string): Evidence['type'] => {
    if (mimeType.startsWith('image/')) return 'IMAGE'
    if (mimeType.startsWith('video/')) return 'VIDEO'
    return 'LOG'
  }

  const getFileTypeLabel = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'Imagem'
    if (mimeType.startsWith('video/')) return 'Vídeo'
    return 'Arquivo'
  }

  const getEvidenceIcon = (type: Evidence['type']) => {
    switch (type) {
      case 'IMAGE':
        return <ImageIcon className="w-4 h-4" />
      case 'VIDEO':
        return <Video className="w-4 h-4" />
      case 'LOG':
        return <FileText className="w-4 h-4" />
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>📎 Evidências (Opcional)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-300 hover:border-gray-400"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Arraste arquivos aqui ou clique para selecionar
          </h3>
          <p className="text-gray-500 mb-4">
            Imagens, vídeos ou logs (máx. 10MB por arquivo)
          </p>
          <Button type="button" variant="outline">
            Selecionar Arquivos
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.txt,.log"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="space-y-2">
            <Label>Upload em Progresso</Label>
            {uploadProgress.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate">{item.file.name}</span>
                  <span>
                    {item.status === 'completed' ? '✅' : 
                     item.status === 'error' ? '❌' : 
                     `${item.progress}%`}
                  </span>
                </div>
                <Progress 
                  value={item.progress} 
                  className={cn(
                    "h-2",
                    item.status === 'error' && "bg-red-100 [&>div]:bg-red-500"
                  )}
                />
              </div>
            ))}
          </div>
        )}

        {/* Add URL Evidence */}
        <div className="border rounded-lg p-4 space-y-4">
          <Label>Adicionar Evidência por URL</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Select
                options={EVIDENCE_TYPES}
                value={newEvidence.type}
                onValueChange={(value) => setNewEvidence(prev => ({ ...prev, type: value as Evidence['type'] }))}
                placeholder="Tipo"
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Descrição da evidência"
                value={newEvidence.description || ''}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Input
                placeholder="URL da evidência"
                value={newEvidence.url || ''}
                onChange={(e) => setNewEvidence(prev => ({ ...prev, url: e.target.value }))}
              />
            </div>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            onClick={addUrlEvidence}
            disabled={!newEvidence.description || !newEvidence.url}
          >
            Adicionar URL
          </Button>
        </div>

        {/* Evidence List */}
        {evidences.length > 0 && (
          <div className="space-y-4">
            <Label>Evidências Adicionadas ({evidences.length})</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidences.map((evidence) => (
                <Card key={evidence.id} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getEvidenceIcon(evidence.type)}
                        <Badge variant="outline">{evidence.type}</Badge>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeEvidence(evidence.id)}
                        className="h-6 w-6"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <h4 className="font-medium text-sm mb-2 line-clamp-2">
                      {evidence.description}
                    </h4>
                    
                    {evidence.file && (
                      <p className="text-xs text-gray-500 mb-2">
                        {formatFileSize(evidence.size || 0)}
                      </p>
                    )}
                    
                    {evidence.url && (
                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(evidence.url, '_blank')}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                    )}
                    
                    {evidence.file && evidence.type === 'IMAGE' && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(evidence.file)}
                          alt={evidence.description}
                          className="w-full h-20 object-cover rounded"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">💡 Dicas para Evidências:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Screenshots da tela com o erro</li>
            <li>• Vídeos curtos mostrando a reprodução</li>
            <li>• Logs do console ou sistema</li>
            <li>• URLs de páginas com problema</li>
            <li>• Arquivos que geram o erro</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}