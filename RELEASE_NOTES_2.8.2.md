# EchoShot 2.8.2

- 修复手动添加 ModelScope 国际版后，`Tongyi-MAI/Z-Image-Turbo` 文生图提示“生图接口未返回图片”的问题。国际版会按异步任务协议查询并获取生成结果。
- 保留已填写的国际版接口地址和设置。国际版 Base URL 应为 `https://api-inference.modelscope.ai/v1`，继续使用国际版 Key。

升级后在扩展管理页重新加载扩展，再重试生成。已有相册、备份和设置会保留。
