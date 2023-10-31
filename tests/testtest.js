import { jest, describe, it, expect } from '@jest/globals';
import getSpt from '@/src/api/shoppingCart.ts'

describe('MyComponent', () => {
    it('should fetch data from the server', async () => {
        const userId = 123; // 用于测试的用户ID
    
        // 模拟axios请求
        const mockAxios = {
          get: jest.fn(() => Promise.resolve({ data: { content: ['item1', 'item2'] } })),
        };
    
        // 使用mockAxios作为axios的替代
        jest.mock('axios', () => mockAxios);
    
        // 调用函数并等待结果
        const result = await getSpt(userId);
    
        // 验证是否成功调用axios.get
        expect(mockAxios.get).toHaveBeenCalledWith(`/api/spt?userId=${userId}`);
    
        // // 验证返回的数据是否正确
        // expect(result).toEqual(['item1', 'item2']);
      });
});
