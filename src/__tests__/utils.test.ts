import { cn, formatDate, generateId } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-blue-500', 'bg-white', 'hover:bg-gray-100')
      expect(result).toBe('text-blue-500 bg-white hover:bg-gray-100')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })
  })

  describe('formatDate', () => {
    it('should format date in Brazilian format', () => {
      const date = new Date('2024-01-15T10:30:00')
      const result = formatDate(date)
      expect(result).toMatch(/15\/01\/2024/)
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toBeDefined()
      expect(id2).toBeDefined()
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(id1.length).toBeGreaterThan(0)
    })
  })
})