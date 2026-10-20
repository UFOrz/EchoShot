# EchoShot 2.8.3

- RunningHub 工作流不再要求把节点标题改成 `$prompt.text!`、`$width.value`、`$height.value`。
- 插件会从平台返回的 API 格式工作流中自动识别正向提示词，并沿采样器的 latent 连线识别宽高，兼容 `KSampler`、`KSampler.classic`、`BasicGuider` 和 `SamplerCustomAdvanced`。
- 支持由 `PrimitiveInt.value` 接入的宽高节点；识别不到尺寸时只覆盖提示词，保留工作流原有尺寸。
- 原有 `$` 标题继续作为显式覆盖，不影响已经适配的工作流。

升级后在扩展管理页重新加载扩展，再重新打开侧边栏。已有相册、备份和设置会保留。
