# EchoShot 2.5.8

本次为插件全面复查后的修复版本。

- 修复 fal.ai 同类模型变体忽略图片比例的问题：`fal-ai/z-image/turbo/lora`、`fal-ai/z-image/base/lora`、`fal-ai/z-image/turbo/tiling`、`fal-ai/z-image/turbo/tiling/lora`、`fal-ai/krea-2/turbo/lora` 现在和基础模型一样，通过 `image_size` 收到“比例与尺寸”设置中的宽高，不再回落到接口默认的 4:3。
- 修复 fal.ai 原版 `fal-ai/nano-banana` 与 `fal-ai/nano-banana/edit` 请求包含官方 schema 不存在的 `resolution` 字段的问题：该字段只发送给真正支持的 Nano Banana 2 / Pro 版本。
- 补齐相册读取失败、删除失败、重新读取相册、后台任务阶段等界面的英文、日文和韩文翻译，这些文案此前在非中文界面下仍显示中文。
- 修复本地备份的浏览器验证脚本：它仍按旧备份目录结构读取图片，一运行就报错，无法覆盖恢复、完整性校验和权限失败等流程；现已按 `versions/` 相对路径读取并通过完整验证。

已通过现有自动化测试、相册删除动画浏览器验证、相册与替换流程浏览器验证，以及修复后的本地备份浏览器验证。未调用任何付费生图接口，fal.ai 远端实际输出仍未实测。

重新加载更新后的插件即可生效，无需更新本地生图服务。
