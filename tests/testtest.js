// MyComponent.spec.js

import { shallowMount } from '@vue/test-utils';
import MyComponent from '@/components/MyComponent.vue';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, it, expect } from '@jest/globals';

describe('MyComponent', () => {
  it('sends a request to the backend on button click', async () => {
    const mock = new MockAdapter(axios);
    const wrapper = shallowMount(MyComponent);

    // 模拟HTTP请求的期望URL和响应
    const url = 'http://localhost:9003/food/serarchNm'; // 后端API的端点
    const responseData = { message: 'Success' };

    // 模拟按钮点击
    await wrapper.find('button').trigger('click');

    // 断言HTTP请求是否正确发送
    mock.onGet(url).reply(200, responseData);
    await wrapper.vm.$nextTick(); // 等待Vue更新
    expect(mock.history.post.length).toBe(1);

    // 断言请求的数据是否正确
    const request = mock.history.post[0];
    expect(request.url).toBe(url);
    // expect(JSON.parse(request.data)).toEqual({ /* 请求的数据 */ });

    // 断言响应是否正确
    expect(wrapper.text()).toContain(responseData.message);

    // 清除请求模拟
    mock.restore();
  });
});
