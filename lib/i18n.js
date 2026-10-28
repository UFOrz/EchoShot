export const SUPPORTED_LANGUAGES = ['zh', 'en', 'ja', 'ko'];
export const LANGUAGE_OPTIONS = [
  { value: 'auto', label: '自动（浏览器语言）' },
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' }
];

const EN = {
  '当前模型仅支持 1024x1024、1536x1024、1024x1536 或 auto，请切换比例、修改对应尺寸或更换模型。': 'This model supports only 1024x1024, 1536x1024, 1024x1536, or auto. Choose another ratio, change its size mapping, or switch models.',
  'EchoShot · 拍同款': 'EchoShot · 拍同款', '设置 · EchoShot · 拍同款': 'Settings · EchoShot · 拍同款', 'EchoShot · 拍同款 · 设置': 'EchoShot · 拍同款 · Settings',
  '（近似值）': ' (Approx.)',
  '通过此链接注册，插件开发者可能获得平台推广奖励，不影响您的使用价格。您也可以直接访问平台官网注册。': 'If you register through this link, the extension developer may receive a referral reward. This does not affect your price. You may also register directly on the provider’s official website.',
  '部分 Get Key 链接属于平台邀请或推广链接。只有在用户主动点击后才会打开；开发者可能获得平台提供的推广奖励，但不会因此提高用户的使用价格。扩展不会自动跳转、替换网页链接、写入推广 Cookie，也不会跟踪用户是否注册或购买。': 'Some Get Key links are provider invitation or referral links. They open only after the user clicks them. The developer may receive a provider referral reward, but this does not increase the user’s price. The extension does not redirect automatically, replace webpage links, write affiliate cookies, or track whether the user registers or purchases.',
  'EchoShot · 拍同款相册': 'EchoShot · 拍同款 Gallery', '隐私政策 · EchoShot · 拍同款': 'Privacy Policy · EchoShot · 拍同款', 'EchoShot · 拍同款 · Chrome 扩展': 'EchoShot · 拍同款 · Chrome Extension',
  '“EchoShot · 拍同款”是一款由用户自行配置 AI 平台 API Key 的 Chrome 扩展，用于分析用户主动选择的网页图片、生成复刻提示词及同款图片，并在本机管理生成记录。': '“EchoShot · 拍同款” is a Chrome extension in which users configure their own AI provider API keys. It analyzes images explicitly selected by the user, reconstructs prompts, generates matching images, and manages results locally.',
  '框选截图': 'Capture Area', '隐藏魔法按钮': 'Hide Magic Button', '显示魔法按钮': 'Show Magic Button', '角色与物品': 'Characters & Objects', '平台与模型设置': 'Platforms & Models',
  '开始前，请确认数据使用方式': 'Before you begin, confirm how your data is used',
  '当你点击反推、生成、角色替换或组图生成时，所选来源图、参考素材和提示词会发送到你选择的 AI 平台，用于完成本次任务。': 'When you reverse, generate, replace a subject, or create a set, selected images, references, and prompts are sent to your chosen AI provider for that task.',
  'API Key 仅保存在本机 Chrome 扩展存储中。': 'API keys are stored only in local Chrome extension storage.',
  '来源图、角色/物品素材、提示词和生成结果保存在本机，可随时删除。': 'Source images, character/object assets, prompts, and results are stored locally and can be deleted at any time.',
  '插件不出售数据，也不将数据用于广告或用户画像。': 'The extension does not sell data or use it for ads or profiling.',
  '我已阅读并同意上述数据处理方式': 'I have read and agree to the data handling described above', '同意并继续': 'Agree and Continue', '查看完整隐私政策': 'View Full Privacy Policy',
  '还没有选择图片': 'No image selected', '浏览网页时，把鼠标悬停在图片上，点击右上角出现的魔法按钮，即可反推提示词并生成同款图片。': 'Hover over an image and click the magic button to reconstruct its prompt and create a matching image.',
  '也可以在图片上点右键，选择「✨ 反推提示词并生成同款」。': 'You can also right-click an image and choose “✨ Reverse prompt and create matching image”.',
  '📷 框选区域截图': '📷 Capture an Area', '打开相册': 'Open Gallery', '来源图片': 'Source Image', '正在获取图片…': 'Loading image…',
  '提示词': 'Prompt', '重新反推': 'Reverse Again', '复制': 'Copy', '正在反推提示词…': 'Reconstructing prompt…', '✓ 反推成功，可直接编辑提示词': '✓ Prompt ready — you can edit it',
  '反推': 'Reverse', '生成设置': 'Generation Settings', '比例': 'Aspect Ratio', '生图': 'Image Model', '✨ 生成图片': '✨ Generate Image',
  '替换角色/物品': 'Replace Character/Object', '正在生成，通常需要 10–60 秒…': 'Generating, usually 10–60 seconds…', '✓ 生成成功': '✓ Generated',
  '替换角色或者物品': 'Replace Character or Object', '管理素材': 'Manage Assets', '保持构图、背景和光影基本不变，只替换目标人物、角色或物品。请选择支持图生图/edit 的模型。': 'Keep composition, background, and lighting unchanged while replacing only the target character or object. Choose an image-edit model.',
  '替换类型': 'Replacement Type', '人物或角色': 'Person or Character', '物品': 'Object', '服装或穿搭': 'Clothing or Outfit',
  '✨ 开始替换': '✨ Start Replacement', '正在替换角色或者物品…': 'Replacing character or object…', '✓ 替换成功，已保存到相册': '✓ Replacement saved to gallery',
  '主体一致组图': 'Consistent Image Set', '同款结果': 'Result', '下载': 'Download', '重新生成': 'Generate Again', '查看相册': 'View Gallery', '✓ 已自动保存到相册': '✓ Saved to gallery',
  '角色与物品库': 'Character & Object Library', '素材只保存在本机': 'Assets are stored locally only', '＋ 添加角色或物品': '＋ Add Character or Object', '关闭': 'Close', '关闭素材大图': 'Close asset preview',
  '正在读取图片': 'Reading image', '切换并保存为默认反推模型': 'Switch and save as default vision model', '反推得到的提示词会显示在这里，可以直接编辑': 'The reconstructed prompt will appear here and can be edited', '切换并保存为默认生图模型': 'Switch and save as default image model',
  '替换角色或者物品提示词': 'Character or object replacement prompt', '在相册中查看大图': 'View full image in gallery', '在相册中查看这张生成图片的大图': 'View this generated image in the gallery',
  '平台与模型管理': 'Platform & Model Management', '查看隐私政策': 'View Privacy Policy', '① 平台管理': '① Platforms', '接口，也可以手动添加模型。': 'endpoint and manual model entry are supported.',
  '自定义接口': 'Custom API', '＋ 添加接口': '＋ Add API', '平台列表': 'Platforms', '② 默认模型': '② Default Models', '默认反推': 'Default Vision Model', '默认生图': 'Default Image Model',
  '③ 比例与尺寸': '③ Ratios & Sizes', '默认比例': 'Default Ratio', '图像质量': 'Image Quality', '适用于 GPT Image 等支持 Quality 的模型': 'For models that support Quality, such as GPT Image', 'Low（默认）': 'Low (Default)',
  '分辨率档位': 'Resolution Tier', '适用于支持 1k / 2k / 4k 的模型': 'For models supporting 1K / 2K / 4K', '1K（默认）': '1K (Default)', '保存设置': 'Save Settings', '✓ 已保存': '✓ Saved', '隐私政策': 'Privacy Policy', '选择接口模板': 'Choose API Template',
  '全选': 'Select All', '删除': 'Delete', '设置': 'Settings', '已选': 'Selected', '张': 'items', '上一页': 'Previous', '下一页': 'Next', '相册还是空的': 'Your gallery is empty',
  '在网页图片上悬停并点击魔法按钮，生成同款图片后会自动保存到这里。': 'Hover over a web image and click the magic button. Generated images are saved here automatically.',
  '原图': 'Original', '同款图片': 'Generated', '准备对比…': 'Preparing comparison…', '＋ 添加到角色库': '＋ Add to Library', '添加到角色库': 'Add to Character Library', '复制提示词': 'Copy Prompt', '反推原文': 'Original Reverse Prompt',
  '生成平台': 'Provider', '生成模型': 'Model', '尺寸': 'Size', '生成时间': 'Created', '查看原图': 'View Original', '来源页面': 'Source Page', '访问页面': 'Open Page',
  '✨ 再拍一张': '✨ Generate Another', '👤 替换角色': '👤 Replace Character', '替换角色': 'Replace Character', '生成组图': 'Generate Set', '确认删除': 'Confirm Deletion', '取消': 'Cancel',
  '搜索提示词 / 中文解读 / 模型…': 'Search prompt / model…', '相册分页': 'Gallery pages', '选择页码': 'Choose page', '上一张': 'Previous image', '下一张': 'Next image', '关闭大图': 'Close preview', '组图数量': 'Number of images',
  '中文解读': 'Explanation', '日语解读': 'Japanese Explanation', '韩语解读': 'Korean Explanation',
  '界面语言': 'Interface Language', '自动（浏览器语言）': 'Auto (Browser Language)',
  '共 {count} 张': '{count} items', '组图 {index}/{count}': 'Set {index}/{count}', '第 {page} 页，共 {total} 页': 'Page {page} of {total}', '搜索结果，第 {page} 页，共 {total} 页': 'Search results, page {page} of {total}',
  '(无提示词)': '(No prompt)', '取消全选': 'Deselect All', '选择': 'Select', '{width} × {height} 像素': '{width} × {height} px',
  '未找到匹配作品': 'No matching images', '可以尝试搜索其他提示词、中文解读、模型或平台名称。': 'Try another prompt, model, or provider name.',
  '可以直接编辑提示词': 'You can edit the prompt', '未启用反推模型': 'No vision model enabled', '未启用生图模型': 'No image model enabled', '尚未启用生图模型': 'No image model enabled', '默认生图': 'Default image model',
  '已设为默认反推模型': 'Default vision model updated', '已设为默认生图模型': 'Default image model updated', '请先反推或输入提示词': 'Reconstruct or enter a prompt first',
  '正在反推提示词，已等待 {seconds} 秒…': 'Reconstructing prompt — {seconds}s elapsed…', '正在生成，已等待 {seconds} 秒…': 'Generating — {seconds}s elapsed…', '正在生成组图，已等待 {seconds} 秒…': 'Generating image set — {seconds}s elapsed…', '已等待 {seconds} 秒…': '{seconds}s elapsed…',
  '请在网页中拖动框选截图区域，按 Esc 可取消': 'Drag on the page to select a capture area. Press Esc to cancel.', '在相册中查看组图第 {index} 张，共 {count} 张': 'View image {index} of {count} in the gallery', '点击在相册中查看大图': 'Click to view full image in gallery', '组图第 {index} 张，共 {count} 张': 'Image {index} of {count}', '提示词已复制': 'Prompt copied',
  '魔法按钮已显示，点击隐藏': 'Magic button is visible; click to hide', '魔法按钮已隐藏，点击显示': 'Magic button is hidden; click to show',
  '新平台': 'New Platform', '尚未获取模型，可自动获取或手动添加。': 'No models yet. Fetch automatically or add one manually.', '未启用的模型已隐藏，可打开上方开关查看。': 'Disabled models are hidden. Turn on the switch above to view them.', '移除模型': 'Remove model', '未命名平台': 'Unnamed Platform', '已添加接口': 'Added APIs', '删除平台': 'Delete Platform', '平台名称': 'Platform Name', '显示': 'Show', '隐藏': 'Hide', '自动获取模型': 'Fetch Models', '手动输入模型名称': 'Enter model name manually', '添加': 'Add', '模型名称与启用能力': 'Models & Capabilities', '显示未启用模型': 'Show disabled models', '反推': 'Vision', '生图': 'Image', '文生图': 'Text to Image', '编辑': 'Edit', '模型能力图例': 'Model capability legend', '适合反推': 'Suitable for vision analysis', '适合文生图': 'Suitable for text-to-image', '适合图像编辑': 'Suitable for image editing', '尚未启用模型': 'No model enabled',
  '✨ 反推提示词并生成同款': '✨ Reconstruct Prompt and Generate', '🖼 打开 EchoShot · 拍同款相册': '🖼 Open EchoShot · 拍同款 Gallery',
  '无法对比': 'Comparison unavailable', '无原图': 'No original', '开启对比': 'Enable Comparison', '关闭对比': 'Disable Comparison', '✓ 已在角色库': '✓ Already in Library', '已在角色库': 'Already in Character Library', '正在添加…': 'Adding…', '正在添加到角色库…': 'Adding to Character Library…', '这张图片已经在角色与物品库中': 'This image is already in the character and object library', '已添加到角色与物品库': 'Added to the character and object library', '确定删除这张图片吗？此操作不可恢复。': 'Delete this image? This action cannot be undone.', '已删除': 'Deleted',
  '2 张': '2 images', '4 张': '4 images', '6 张': '6 images', '8 张': '8 images', '上一张（←）': 'Previous (←)', '下一张（→）': 'Next (→)',
  '反 {count}': 'Vision {count}', '图 {count}': 'Image {count}', '正在获取…': 'Fetching…', '获取中…': 'Fetching…', '已获取 {total} 个，新增 {added} 个': 'Fetched {total}; added {added}', '已获取 {total} 个（反推 {vision}，生图 {image}），新增 {added} 个': 'Fetched {total} (vision {vision}, image {image}); added {added}', '正在获取工作流名称…': 'Fetching workflow name…', '已自动填入工作流名称': 'Workflow name filled in', '未获取到工作流名称，可手动填写别名': 'Could not fetch the workflow name; enter an alias manually', '模型已在列表中': 'Model is already in the list', '再次点击删除': 'Click again to delete',
  '每个平台独立保存 API 地址和密钥。密钥仅保存在本机浏览器中；执行反推或生图时，所选图片和提示词会发送到你选择的 AI 平台。': 'Each platform stores its API address and key separately. Keys stay in this browser; selected images and prompts are sent to the chosen AI platform only when running a task.',
  '支持 OpenAI 兼容的': 'Supports OpenAI-compatible', '侧边栏切换模型会自动保存；在这里修改后，请点击“保存设置”。后续任务都会使用新的默认值。': 'Model changes in the side panel are saved automatically. Changes made here take effect after you click “Save Settings”.', '比例会映射为生图接口的 size 参数，请按所选模型支持的尺寸填写。': 'Ratios map to the image API size parameter. Enter sizes supported by the selected model.', '插件会根据模型协议提交对应选项；不支持 Quality 或分辨率档位的模型仍使用上方像素尺寸。': 'The extension sends supported quality options according to each model protocol; other models use the pixel sizes above.',
  '“拍同款”是一款由用户自行配置 AI 平台 API Key 的 Chrome 扩展，用于分析用户主动选择的网页图片、生成复刻提示词及同款图片，并在本机管理生成记录。': '“Match This” is a Chrome extension in which users configure their own AI provider API keys. It analyzes images explicitly selected by the user, reconstructs prompts, generates matching images, and manages results locally.',
  'API 配置：': 'API configuration:', '平台名称、Base URL、模型名称及用户填写的 API Key。': 'Platform name, Base URL, model name, and the API key entered by the user.', '主动选择的内容：': 'User-selected content:', '网页图片、用户主动框选截取的当前可见页面区域、图片地址、所在页面 URL 和页面标题。': 'Web images, visible page regions explicitly captured by the user, image URLs, page URLs, and page titles.', '替换参考素材：': 'Replacement references:', '用户添加到本机角色与物品库中的图片和名称。': 'Images and names added by the user to the local character and object library.', '用户生成内容：': 'User-generated content:', '反推提示词、用户编辑后的提示词、生成图片及生成参数。': 'Reconstructed prompts, user-edited prompts, generated images, and generation parameters.', '本地任务状态：': 'Local task state:', '当前任务、模型选择、相册记录和界面设置。': 'Current tasks, model selections, gallery records, and interface settings.',
  '扩展不收集姓名、邮箱、通讯录、精确位置、支付卡信息，也不创建跨网站用户画像。': 'The extension does not collect names, email addresses, contacts, precise location, or payment card information, and does not create cross-site profiles.',
  '只有当用户点击反推、生成、替换角色或组图生成时，扩展才会将完成任务所必需的来源图、参考素材和提示词发送到用户选定的 AI 平台。': 'Only when the user starts a reverse, generation, replacement, or image-set task does the extension send the source images, references, and prompts required for that task to the selected AI provider.', 'API Key 仅用于向该平台鉴权。扩展开发者不运营中转服务器，也不会接收用户的 API Key、图片或提示词。': 'API keys are used only to authenticate with the selected provider. The developer operates no relay server and does not receive users’ API keys, images, or prompts.', '内置平台包括 OpenAI、ModelScope、SiliconFlow、Agnes-AI、ZenMux、RunningHUB、AtlasCloud、APImart、OpenRouter、QianwenAI、Aliyun Token Plan 和 fal.ai；用户也可以配置自己的兼容服务。': 'Built-in platforms include OpenAI, ModelScope, SiliconFlow, Agnes-AI, ZenMux, RunningHUB, AtlasCloud, APImart, OpenRouter, QianwenAI, Aliyun Token Plan, and fal.ai. Users may also configure compatible services.', '第三方平台如何保存和处理请求，由相应平台的隐私政策及用户与该平台之间的协议决定。': 'How third-party platforms retain and process requests is governed by their privacy policies and the user’s agreement with them.', '除完成用户明确请求的反推、生图，或法律、安全所必需的情形外，扩展不会向其他第三方传输数据。': 'The extension does not transfer data to other third parties except to fulfill explicit user requests or where required by law or security.',
  'API 配置保存在': 'API configuration is stored in', '，并限制为扩展可信页面和后台访问。': 'and is restricted to trusted extension pages and background access.', '当前任务临时保存在': 'Current tasks are temporarily stored in', '。': '.', '来源图、角色/物品参考素材、提示词和生成图片保存在本机 IndexedDB 中。': 'Source images, character/object references, prompts, and generated images are stored in local IndexedDB.', '用户可以删除 API Key、参考素材和相册作品；卸载扩展会清除 Chrome 管理的扩展本地数据。': 'Users can delete API keys, reference assets, and gallery items. Uninstalling the extension clears extension-local data managed by Chrome.',
  '预设 AI 平台均使用 HTTPS。': 'Preset AI platforms use HTTPS.', '自定义 API Base URL 必须使用 HTTPS；仅本机 localhost 调试允许 HTTP。': 'Custom API Base URLs must use HTTPS; HTTP is allowed only for local localhost development.', '扩展不加载或执行远程 JavaScript，全部运行逻辑均包含在安装包中。': 'The extension does not load or execute remote JavaScript; all runtime logic is included in the package.',
  '扩展不会出售用户数据，不会将用户数据用于个性化广告、再营销、信用评估或数据经纪，也不会允许开发者或其他人员读取用户内容；法律义务或用户明确请求的支持情形除外。': 'The extension does not sell user data or use it for personalized ads, remarketing, credit assessment, or data brokerage, and does not allow the developer or others to read user content except where legally required or explicitly requested for support.', '扩展对用户数据的使用遵守 Chrome Web Store User Data Policy，包括 Limited Use 要求。': 'Use of user data complies with the Chrome Web Store User Data Policy, including Limited Use requirements.', '扩展并非专门面向儿童，也不会有意收集儿童个人信息。': 'The extension is not directed at children and does not intentionally collect children’s personal information.', '如数据处理方式发生实质变化，扩展会在实施前通过产品界面提示，并在需要时重新征得同意。有关隐私的问题，可通过 Chrome Web Store 商品页面的“支持”入口联系发布者。': 'If data handling changes materially, the extension will notify users before implementation and request consent again where required. For privacy questions, contact the publisher through the Support link on the Chrome Web Store listing.',
  '隐私政策': 'Privacy Policy', '更新日期：2026 年 7 月 22 日': 'Updated: July 22, 2026', '处理的数据': 'Data We Process', '数据用途与共享': 'How Data Is Used and Shared', '本地保存与删除': 'Local Storage and Deletion', '数据安全': 'Data Security', '广告、出售与 Limited Use': 'Advertising, Sale, and Limited Use', '儿童隐私': 'Children’s Privacy', '政策变更与联系': 'Policy Changes and Contact'
};

const JA = {
  ...EN,
  '当前模型仅支持 1024x1024、1536x1024、1024x1536 或 auto，请切换比例、修改对应尺寸或更换模型。': 'このモデルは 1024x1024、1536x1024、1024x1536、auto のみ対応しています。比率または対応するサイズを変更するか、別のモデルを選択してください。',
  'EchoShot · 拍同款': 'EchoShot · 拍同款', '设置 · EchoShot · 拍同款': '設定 · EchoShot · 拍同款', 'EchoShot · 拍同款 · 设置': 'EchoShot · 拍同款 · 設定', 'EchoShot · 拍同款相册': 'EchoShot · 拍同款 アルバム', '隐私政策 · EchoShot · 拍同款': 'プライバシーポリシー · EchoShot · 拍同款', 'EchoShot · 拍同款 · Chrome 扩展': 'EchoShot · 拍同款 · Chrome 拡張機能',
  '“EchoShot · 拍同款”是一款由用户自行配置 AI 平台 API Key 的 Chrome 扩展，用于分析用户主动选择的网页图片、生成复刻提示词及同款图片，并在本机管理生成记录。': '「EchoShot · 拍同款」は、ユーザー自身がAIサービスのAPIキーを設定し、明示的に選択したウェブ画像の解析、再現プロンプトと類似画像の生成、生成履歴のローカル管理を行うChrome拡張機能です。',
  '（近似值）': '（近似値）',
  '通过此链接注册，插件开发者可能获得平台推广奖励，不影响您的使用价格。您也可以直接访问平台官网注册。': 'このリンクから登録すると、拡張機能の開発者が紹介報酬を受け取る場合があります。利用料金には影響しません。各サービスの公式サイトから直接登録することもできます。',
  '部分 Get Key 链接属于平台邀请或推广链接。只有在用户主动点击后才会打开；开发者可能获得平台提供的推广奖励，但不会因此提高用户的使用价格。扩展不会自动跳转、替换网页链接、写入推广 Cookie，也不会跟踪用户是否注册或购买。': '一部のGet Keyリンクは招待・紹介リンクです。ユーザーが明示的にクリックした場合にのみ開きます。開発者が紹介報酬を受け取る場合がありますが、利用料金が上がることはありません。自動転送、ウェブページのリンク置換、紹介Cookieの書き込み、登録・購入状況の追跡は行いません。',
  '框选截图': '範囲をキャプチャ', '隐藏魔法按钮': 'マジックボタンを非表示', '显示魔法按钮': 'マジックボタンを表示', '角色与物品': '人物とアイテム', '平台与模型设置': 'プラットフォームとモデル',
  '开始前，请确认数据使用方式': '開始前にデータの利用方法をご確認ください', '我已阅读并同意上述数据处理方式': '上記のデータ処理を確認し、同意します', '同意并继续': '同意して続行', '查看完整隐私政策': 'プライバシーポリシー全文を見る',
  '还没有选择图片': '画像が選択されていません', '📷 框选区域截图': '📷 範囲をキャプチャ', '打开相册': 'アルバムを開く', '来源图片': '元画像', '正在获取图片…': '画像を読み込み中…',
  '提示词': 'プロンプト', '重新反推': '再解析', '复制': 'コピー', '正在反推提示词…': 'プロンプトを解析中…', '✓ 反推成功，可直接编辑提示词': '✓ 解析完了・編集できます', '反推': '解析モデル',
  '生成设置': '生成設定', '比例': 'アスペクト比', '生图': '画像モデル', '✨ 生成图片': '✨ 画像を生成', '替换角色/物品': '人物/アイテムを置換', '✓ 生成成功': '✓ 生成完了',
  '替换角色或者物品': '人物またはアイテムを置換', '管理素材': '素材を管理', '替换类型': '置換タイプ', '人物或角色': '人物またはキャラクター', '物品': 'アイテム', '服装或穿搭': '服装またはコーデ', '✨ 开始替换': '✨ 置換を開始', '正在替换角色或者物品…': '人物またはアイテムを置換中…', '✓ 替换成功，已保存到相册': '✓ 置換結果をアルバムに保存しました',
  '主体一致组图': '主体を統一した画像セット', '同款结果': '生成結果', '下载': 'ダウンロード', '重新生成': '再生成', '查看相册': 'アルバムを見る', '✓ 已自动保存到相册': '✓ アルバムに自動保存しました',
  '角色与物品库': '人物・アイテムライブラリ', '素材只保存在本机': '素材は端末内にのみ保存されます', '＋ 添加角色或物品': '＋ 人物またはアイテムを追加', '关闭': '閉じる', '在相册中查看大图': 'アルバムで拡大表示',
  '平台与模型管理': 'プラットフォームとモデル管理', '查看隐私政策': 'プライバシーポリシーを見る', '① 平台管理': '① プラットフォーム管理', '自定义接口': 'カスタム API', '＋ 添加接口': '＋ API を追加', '平台列表': 'プラットフォーム',
  '② 默认模型': '② デフォルトモデル', '默认反推': 'デフォルト解析モデル', '默认生图': 'デフォルト画像モデル', '③ 比例与尺寸': '③ 比率とサイズ', '默认比例': 'デフォルト比率', '图像质量': '画像品質', '分辨率档位': '解像度', '保存设置': '設定を保存', '✓ 已保存': '✓ 保存しました', '隐私政策': 'プライバシーポリシー',
  '全选': 'すべて選択', '删除': '削除', '设置': '設定', '已选': '選択済み', '张': '件', '上一页': '前へ', '下一页': '次へ', '相册还是空的': 'アルバムは空です', '原图': '元画像', '同款图片': '生成画像', '准备对比…': '比較を準備中…',
  '＋ 添加到角色库': '＋ ライブラリに追加', '添加到角色库': '人物・アイテムライブラリに追加', '复制提示词': 'プロンプトをコピー', '反推原文': '解析元プロンプト', '生成平台': '生成サービス', '生成模型': '生成モデル', '尺寸': 'サイズ', '生成时间': '生成日時', '查看原图': '元画像を見る', '来源页面': '元ページ', '访问页面': 'ページを開く',
  '✨ 再拍一张': '✨ もう1枚生成', '👤 替换角色': '👤 人物を置換', '替换角色': '人物を置換', '生成组图': '画像セットを生成', '确认删除': '削除の確認', '取消': 'キャンセル', '搜索提示词 / 中文解读 / 模型…': 'プロンプト / 日本語解説 / モデルを検索…', '上一张': '前の画像', '下一张': '次の画像', '日语解读': '日本語解説', '中文解读': '日本語解説',
  '界面语言': '表示言語', '自动（浏览器语言）': '自動（ブラウザの言語）', '更新日期：2026 年 7 月 21 日': '更新日：2026年7月21日', '处理的数据': '処理するデータ', '数据用途与共享': 'データの利用と共有', '本地保存与删除': 'ローカル保存と削除', '数据安全': 'データセキュリティ', '儿童隐私': '子どものプライバシー', '政策变更与联系': 'ポリシーの変更とお問い合わせ'
  , '共 {count} 张': '全{count}件', '组图 {index}/{count}': 'セット {index}/{count}', '第 {page} 页，共 {total} 页': '{total}ページ中{page}ページ', '搜索结果，第 {page} 页，共 {total} 页': '検索結果、{total}ページ中{page}ページ', '(无提示词)': '（プロンプトなし）', '取消全选': '選択を解除', '选择': '選択', '{width} × {height} 像素': '{width} × {height} ピクセル', '未找到匹配作品': '一致する作品がありません', '可以尝试搜索其他提示词、中文解读、模型或平台名称。': '別のプロンプト、日本語解説、モデル、またはサービス名で検索してください。'
  , '当你点击反推、生成、角色替换或组图生成时，所选来源图、参考素材和提示词会发送到你选择的 AI 平台，用于完成本次任务。': '解析、生成、人物置換、画像セット生成を実行すると、選択した元画像、参照素材、プロンプトがタスク処理のため選択したAIサービスへ送信されます。', 'API Key 仅保存在本机 Chrome 扩展存储中。': 'APIキーはこの端末のChrome拡張機能ストレージにのみ保存されます。', '来源图、角色/物品素材、提示词和生成结果保存在本机，可随时删除。': '元画像、人物・アイテム素材、プロンプト、生成結果は端末内に保存され、いつでも削除できます。', '插件不出售数据，也不将数据用于广告或用户画像。': '本拡張機能はデータを販売せず、広告やプロファイリングにも使用しません。'
  , '可以直接编辑提示词': 'プロンプトを編集できます', '未启用反推模型': '解析モデルが有効になっていません', '未启用生图模型': '画像モデルが有効になっていません', '尚未启用生图模型': '画像モデルが有効になっていません', '默认生图': 'デフォルト画像モデル', '已设为默认反推模型': 'デフォルト解析モデルを更新しました', '已设为默认生图模型': 'デフォルト画像モデルを更新しました', '请先反推或输入提示词': '先にプロンプトを解析または入力してください', '正在反推提示词，已等待 {seconds} 秒…': 'プロンプトを解析中 · {seconds}秒経過…', '正在生成，已等待 {seconds} 秒…': '生成中 · {seconds}秒経過…', '正在生成组图，已等待 {seconds} 秒…': '画像セットを生成中 · {seconds}秒経過…', '已等待 {seconds} 秒…': '{seconds}秒経過…', '请在网页中拖动框选截图区域，按 Esc 可取消': 'ページ上をドラッグしてキャプチャ範囲を選択してください。Escでキャンセルできます。', '在相册中查看组图第 {index} 张，共 {count} 张': 'アルバムで{count}枚中{index}枚目を表示', '点击在相册中查看大图': 'クリックしてアルバムで拡大表示', '组图第 {index} 张，共 {count} 张': '{count}枚中{index}枚目', '提示词已复制': 'プロンプトをコピーしました', '魔法按钮已显示，点击隐藏': 'マジックボタンは表示中です。クリックで非表示', '魔法按钮已隐藏，点击显示': 'マジックボタンは非表示です。クリックで表示'
  , '新平台': '新しいプラットフォーム', '尚未获取模型，可自动获取或手动添加。': 'モデルがありません。自動取得または手動追加してください。', '未启用的模型已隐藏，可打开上方开关查看。': '無効なモデルは非表示です。上のスイッチで表示できます。', '移除模型': 'モデルを削除', '未命名平台': '名称未設定', '已添加接口': '追加済みAPI', '删除平台': 'プラットフォームを削除', '平台名称': 'プラットフォーム名', '显示': '表示', '隐藏': '非表示', '自动获取模型': 'モデルを自動取得', '手动输入模型名称': 'モデル名を手動入力', '添加': '追加', '模型名称与启用能力': 'モデルと機能', '显示未启用模型': '無効なモデルを表示', '文生图': 'テキストから画像', '编辑': '編集', '模型能力图例': 'モデル機能の凡例', '适合反推': '画像解析向け', '适合文生图': 'テキスト画像生成向け', '适合图像编辑': '画像編集向け', '尚未启用模型': '有効なモデルなし'
  , '✨ 反推提示词并生成同款': '✨ プロンプトを解析して生成', '🖼 打开 EchoShot · 拍同款相册': '🖼 EchoShot · 拍同款 アルバムを開く'
  , '无法对比': '比較できません', '无原图': '元画像なし', '开启对比': '比較を有効化', '关闭对比': '比較を無効化', '✓ 已在角色库': '✓ ライブラリに追加済み', '已在角色库': '人物・アイテムライブラリに追加済み', '正在添加…': '追加中…', '正在添加到角色库…': '人物・アイテムライブラリに追加中…', '这张图片已经在角色与物品库中': 'この画像は人物・アイテムライブラリに追加済みです', '已添加到角色与物品库': '人物・アイテムライブラリに追加しました', '确定删除这张图片吗？此操作不可恢复。': 'この画像を削除しますか？元に戻せません。', '已删除': '削除しました'
  , '2 张': '2枚', '4 张': '4枚', '6 张': '6枚', '8 张': '8枚', '上一张（←）': '前の画像（←）', '下一张（→）': '次の画像（→）'
  , '反 {count}': '解析 {count}', '图 {count}': '画像 {count}', '正在获取…': '取得中…', '获取中…': '取得中…', '已获取 {total} 个，新增 {added} 个': '{total}件取得、{added}件追加', '已获取 {total} 个（反推 {vision}，生图 {image}），新增 {added} 个': '{total}件取得（解析{vision}、画像{image}）、{added}件追加', '正在获取工作流名称…': 'ワークフロー名を取得中…', '已自动填入工作流名称': 'ワークフロー名を自動入力しました', '未获取到工作流名称，可手动填写别名': 'ワークフロー名を取得できません。別名を手入力できます', '模型已在列表中': 'モデルはすでにリストにあります', '再次点击删除': 'もう一度クリックして削除'
  , '浏览网页时，把鼠标悬停在图片上，点击右上角出现的魔法按钮，即可反推提示词并生成同款图片。': 'ウェブ画像にカーソルを合わせ、右上のマジックボタンをクリックすると、プロンプトを解析して同じ雰囲気の画像を生成できます。', '也可以在图片上点右键，选择「✨ 反推提示词并生成同款」。': '画像を右クリックして「✨ プロンプトを解析して生成」を選ぶこともできます。', '保持构图、背景和光影基本不变，只替换目标人物、角色或物品。请选择支持图生图/edit 的模型。': '構図、背景、光を保ったまま対象の人物またはアイテムだけを置換します。画像編集対応モデルを選択してください。', '正在生成，通常需要 10–60 秒…': '生成中です。通常10〜60秒かかります…', '反推得到的提示词会显示在这里，可以直接编辑': '解析したプロンプトがここに表示され、直接編集できます', '切换并保存为默认反推模型': '切り替えてデフォルト解析モデルとして保存', '切换并保存为默认生图模型': '切り替えてデフォルト画像モデルとして保存'
  , '每个平台独立保存 API 地址和密钥。密钥仅保存在本机浏览器中；执行反推或生图时，所选图片和提示词会发送到你选择的 AI 平台。': '各プラットフォームのAPIアドレスとキーは個別に保存されます。キーはこのブラウザ内にのみ保存され、タスク実行時だけ選択した画像とプロンプトが選択先のAIサービスへ送信されます。', '支持 OpenAI 兼容的': 'OpenAI互換の', '侧边栏切换模型会自动保存；在这里修改后，请点击“保存设置”。后续任务都会使用新的默认值。': 'サイドパネルでのモデル変更は自動保存されます。ここで変更した場合は「設定を保存」をクリックしてください。', '比例会映射为生图接口的 size 参数，请按所选模型支持的尺寸填写。': '比率は画像APIのsizeパラメータに対応します。選択モデルが対応するサイズを入力してください。', '插件会根据模型协议提交对应选项；不支持 Quality 或分辨率档位的模型仍使用上方像素尺寸。': 'モデルの仕様に応じて品質設定を送信します。未対応モデルでは上記のピクセルサイズを使用します。'
  , '“拍同款”是一款由用户自行配置 AI 平台 API Key 的 Chrome 扩展，用于分析用户主动选择的网页图片、生成复刻提示词及同款图片，并在本机管理生成记录。': '「同じ画像を作る」は、ユーザー自身がAIサービスのAPIキーを設定し、明示的に選択したウェブ画像の解析、再現プロンプトと類似画像の生成、生成履歴のローカル管理を行うChrome拡張機能です。', 'API 配置：': 'API設定：', '平台名称、Base URL、模型名称及用户填写的 API Key。': 'プラットフォーム名、Base URL、モデル名、ユーザーが入力したAPIキー。', '主动选择的内容：': 'ユーザーが選択した内容：', '网页图片、用户主动框选截取的当前可见页面区域、图片地址、所在页面 URL 和页面标题。': 'ウェブ画像、ユーザーが範囲指定した表示中のページ領域、画像URL、ページURL、ページタイトル。', '替换参考素材：': '置換用の参照素材：', '用户添加到本机角色与物品库中的图片和名称。': 'ローカルの人物・アイテムライブラリに追加した画像と名称。', '用户生成内容：': 'ユーザー生成コンテンツ：', '反推提示词、用户编辑后的提示词、生成图片及生成参数。': '解析プロンプト、編集済みプロンプト、生成画像、生成パラメータ。', '本地任务状态：': 'ローカルタスク状態：', '当前任务、模型选择、相册记录和界面设置。': '現在のタスク、モデル選択、アルバム記録、画面設定。', '扩展不收集姓名、邮箱、通讯录、精确位置、支付卡信息，也不创建跨网站用户画像。': '氏名、メールアドレス、連絡先、正確な位置情報、決済カード情報は収集せず、サイト横断プロファイルも作成しません。'
  , '只有当用户点击反推、生成、替换角色或组图生成时，扩展才会将完成任务所必需的来源图、参考素材和提示词发送到用户选定的 AI 平台。': 'ユーザーが解析、生成、人物置換、画像セット生成を開始した場合に限り、タスクに必要な元画像、参照素材、プロンプトを選択したAIサービスへ送信します。', 'API Key 仅用于向该平台鉴权。扩展开发者不运营中转服务器，也不会接收用户的 API Key、图片或提示词。': 'APIキーは選択先サービスの認証にのみ使用されます。開発者は中継サーバーを運営せず、APIキー、画像、プロンプトを受信しません。', '内置平台包括 OpenAI、ModelScope、SiliconFlow、Agnes-AI、ZenMux、RunningHUB、AtlasCloud、APImart、OpenRouter、QianwenAI、Aliyun Token Plan 和 fal.ai；用户也可以配置自己的兼容服务。': '内蔵サービスはOpenAI、ModelScope、SiliconFlow、Agnes-AI、ZenMux、RunningHUB、AtlasCloud、APImart、OpenRouter、QianwenAI、Aliyun Token Plan、fal.aiです。互換サービスも設定できます。', '第三方平台如何保存和处理请求，由相应平台的隐私政策及用户与该平台之间的协议决定。': '第三者サービスによるリクエストの保存と処理は、各サービスのプライバシーポリシーとユーザー契約に従います。', '除完成用户明确请求的反推、生图，或法律、安全所必需的情形外，扩展不会向其他第三方传输数据。': '明示されたタスクの実行、法令または安全上必要な場合を除き、他の第三者へデータを送信しません。'
  , 'API 配置保存在': 'API設定は', '，并限制为扩展可信页面和后台访问。': 'に保存され、信頼済みの拡張ページとバックグラウンドからのみアクセスできます。', '当前任务临时保存在': '現在のタスクは一時的に', '。': '。', '来源图、角色/物品参考素材、提示词和生成图片保存在本机 IndexedDB 中。': '元画像、人物・アイテム参照、プロンプト、生成画像はローカルIndexedDBに保存されます。', '用户可以删除 API Key、参考素材和相册作品；卸载扩展会清除 Chrome 管理的扩展本地数据。': 'APIキー、参照素材、アルバム作品は削除できます。拡張機能をアンインストールするとChrome管理のローカルデータも削除されます。', '预设 AI 平台均使用 HTTPS。': 'プリセットAIサービスはHTTPSを使用します。', '自定义 API Base URL 必须使用 HTTPS；仅本机 localhost 调试允许 HTTP。': 'カスタムAPI Base URLはHTTPS必須です。HTTPはlocalhostでの開発時のみ許可されます。', '扩展不加载或执行远程 JavaScript，全部运行逻辑均包含在安装包中。': 'リモートJavaScriptを読み込み・実行せず、すべてのロジックはインストールパッケージに含まれます。', '扩展不会出售用户数据，不会将用户数据用于个性化广告、再营销、信用评估或数据经纪，也不会允许开发者或其他人员读取用户内容；法律义务或用户明确请求的支持情形除外。': 'ユーザーデータを販売せず、パーソナライズ広告、リマーケティング、信用評価、データ仲介に使用しません。法的義務またはユーザーが明示的に依頼したサポートを除き、開発者その他の者が内容を読むこともありません。', '扩展对用户数据的使用遵守 Chrome Web Store User Data Policy，包括 Limited Use 要求。': 'ユーザーデータの利用はLimited Use要件を含むChrome Web Store User Data Policyに準拠します。', '扩展并非专门面向儿童，也不会有意收集儿童个人信息。': '子ども向けの拡張機能ではなく、子どもの個人情報を意図的に収集しません。', '如数据处理方式发生实质变化，扩展会在实施前通过产品界面提示，并在需要时重新征得同意。有关隐私的问题，可通过 Chrome Web Store 商品页面的“支持”入口联系发布者。': 'データ処理が大きく変わる場合は実施前に画面で通知し、必要に応じて再同意を求めます。プライバシーに関するお問い合わせはChrome Web Store掲載ページのサポート窓口から行えます。'
};

const KO = {
  ...EN,
  '当前模型仅支持 1024x1024、1536x1024、1024x1536 或 auto，请切换比例、修改对应尺寸或更换模型。': '이 모델은 1024x1024, 1536x1024, 1024x1536 또는 auto만 지원합니다. 비율이나 해당 크기 설정을 변경하거나 다른 모델을 선택하세요.',
  'EchoShot · 拍同款': 'EchoShot · 拍同款', '设置 · EchoShot · 拍同款': '설정 · EchoShot · 拍同款', 'EchoShot · 拍同款 · 设置': 'EchoShot · 拍同款 · 설정', 'EchoShot · 拍同款相册': 'EchoShot · 拍同款 앨범', '隐私政策 · EchoShot · 拍同款': '개인정보 처리방침 · EchoShot · 拍同款', 'EchoShot · 拍同款 · Chrome 扩展': 'EchoShot · 拍同款 · Chrome 확장 프로그램',
  '“EchoShot · 拍同款”是一款由用户自行配置 AI 平台 API Key 的 Chrome 扩展，用于分析用户主动选择的网页图片、生成复刻提示词及同款图片，并在本机管理生成记录。': '“EchoShot · 拍同款”는 사용자가 직접 AI 플랫폼 API 키를 설정하고 명시적으로 선택한 웹 이미지를 분석하여 재현 프롬프트와 유사 이미지를 생성하고 결과를 로컬에서 관리하는 Chrome 확장 프로그램입니다.',
  '（近似值）': ' (근사값)',
  '通过此链接注册，插件开发者可能获得平台推广奖励，不影响您的使用价格。您也可以直接访问平台官网注册。': '이 링크를 통해 가입하면 확장 프로그램 개발자가 추천 보상을 받을 수 있습니다. 사용 가격에는 영향을 주지 않습니다. 플랫폼 공식 웹사이트에서 직접 가입할 수도 있습니다.',
  '部分 Get Key 链接属于平台邀请或推广链接。只有在用户主动点击后才会打开；开发者可能获得平台提供的推广奖励，但不会因此提高用户的使用价格。扩展不会自动跳转、替换网页链接、写入推广 Cookie，也不会跟踪用户是否注册或购买。': '일부 Get Key 링크는 플랫폼 초대 또는 추천 링크입니다. 사용자가 직접 클릭한 경우에만 열립니다. 개발자가 추천 보상을 받을 수 있지만 사용자 가격은 올라가지 않습니다. 확장 프로그램은 자동 이동, 웹페이지 링크 교체, 추천 쿠키 기록 또는 가입·구매 여부 추적을 하지 않습니다.',
  '框选截图': '영역 캡처', '隐藏魔法按钮': '매직 버튼 숨기기', '显示魔法按钮': '매직 버튼 표시', '角色与物品': '인물 및 사물', '平台与模型设置': '플랫폼 및 모델',
  '开始前，请确认数据使用方式': '시작하기 전에 데이터 사용 방식을 확인하세요', '我已阅读并同意上述数据处理方式': '위 데이터 처리 방식을 읽고 동의합니다', '同意并继续': '동의하고 계속', '查看完整隐私政策': '전체 개인정보 처리방침 보기',
  '还没有选择图片': '선택한 이미지가 없습니다', '📷 框选区域截图': '📷 영역 캡처', '打开相册': '앨범 열기', '来源图片': '원본 이미지', '正在获取图片…': '이미지 불러오는 중…',
  '提示词': '프롬프트', '重新反推': '다시 분석', '复制': '복사', '正在反推提示词…': '프롬프트 분석 중…', '✓ 反推成功，可直接编辑提示词': '✓ 분석 완료 · 편집할 수 있습니다', '反推': '분석 모델',
  '生成设置': '생성 설정', '比例': '화면 비율', '生图': '이미지 모델', '✨ 生成图片': '✨ 이미지 생성', '替换角色/物品': '인물/사물 교체', '✓ 生成成功': '✓ 생성 완료',
  '替换角色或者物品': '인물 또는 사물 교체', '管理素材': '소재 관리', '替换类型': '교체 유형', '人物或角色': '인물 또는 캐릭터', '物品': '물품', '服装或穿搭': '의상 또는 스타일링', '✨ 开始替换': '✨ 교체 시작', '正在替换角色或者物品…': '인물 또는 사물 교체 중…', '✓ 替换成功，已保存到相册': '✓ 교체 결과를 앨범에 저장했습니다',
  '主体一致组图': '주제가 일관된 이미지 세트', '同款结果': '생성 결과', '下载': '다운로드', '重新生成': '다시 생성', '查看相册': '앨범 보기', '✓ 已自动保存到相册': '✓ 앨범에 자동 저장했습니다',
  '角色与物品库': '인물 및 사물 라이브러리', '素材只保存在本机': '소재는 이 기기에만 저장됩니다', '＋ 添加角色或物品': '＋ 인물 또는 사물 추가', '关闭': '닫기', '在相册中查看大图': '앨범에서 크게 보기',
  '平台与模型管理': '플랫폼 및 모델 관리', '查看隐私政策': '개인정보 처리방침 보기', '① 平台管理': '① 플랫폼 관리', '自定义接口': '사용자 지정 API', '＋ 添加接口': '＋ API 추가', '平台列表': '플랫폼 목록',
  '② 默认模型': '② 기본 모델', '默认反推': '기본 분석 모델', '默认生图': '기본 이미지 모델', '③ 比例与尺寸': '③ 비율 및 크기', '默认比例': '기본 비율', '图像质量': '이미지 품질', '分辨率档位': '해상도', '保存设置': '설정 저장', '✓ 已保存': '✓ 저장됨', '隐私政策': '개인정보 처리방침',
  '全选': '전체 선택', '删除': '삭제', '设置': '설정', '已选': '선택됨', '张': '개', '上一页': '이전', '下一页': '다음', '相册还是空的': '앨범이 비어 있습니다', '原图': '원본', '同款图片': '생성 이미지', '准备对比…': '비교 준비 중…',
  '＋ 添加到角色库': '＋ 라이브러리에 추가', '添加到角色库': '인물 및 사물 라이브러리에 추가', '复制提示词': '프롬프트 복사', '反推原文': '원본 분석 프롬프트', '生成平台': '생성 플랫폼', '生成模型': '생성 모델', '尺寸': '크기', '生成时间': '생성 시간', '查看原图': '원본 보기', '来源页面': '원본 페이지', '访问页面': '페이지 열기',
  '✨ 再拍一张': '✨ 한 장 더 생성', '👤 替换角色': '👤 인물 교체', '替换角色': '인물 교체', '生成组图': '이미지 세트 생성', '确认删除': '삭제 확인', '取消': '취소', '搜索提示词 / 中文解读 / 模型…': '프롬프트 / 한국어 해설 / 모델 검색…', '上一张': '이전 이미지', '下一张': '다음 이미지', '韩语解读': '한국어 해설', '中文解读': '한국어 해설',
  '界面语言': '표시 언어', '自动（浏览器语言）': '자동(브라우저 언어)', '更新日期：2026 年 7 月 21 日': '업데이트: 2026년 7월 21일', '处理的数据': '처리하는 데이터', '数据用途与共享': '데이터 사용 및 공유', '本地保存与删除': '로컬 저장 및 삭제', '数据安全': '데이터 보안', '儿童隐私': '아동 개인정보 보호', '政策变更与联系': '정책 변경 및 문의'
  , '共 {count} 张': '총 {count}개', '组图 {index}/{count}': '세트 {index}/{count}', '第 {page} 页，共 {total} 页': '총 {total}페이지 중 {page}페이지', '搜索结果，第 {page} 页，共 {total} 页': '검색 결과, 총 {total}페이지 중 {page}페이지', '(无提示词)': '(프롬프트 없음)', '取消全选': '전체 선택 해제', '选择': '선택', '{width} × {height} 像素': '{width} × {height} 픽셀', '未找到匹配作品': '일치하는 작품이 없습니다', '可以尝试搜索其他提示词、中文解读、模型或平台名称。': '다른 프롬프트, 한국어 해설, 모델 또는 플랫폼 이름으로 검색해 보세요.'
  , '当你点击反推、生成、角色替换或组图生成时，所选来源图、参考素材和提示词会发送到你选择的 AI 平台，用于完成本次任务。': '분석, 생성, 인물 교체 또는 이미지 세트 생성을 실행하면 선택한 원본 이미지, 참고 소재 및 프롬프트가 작업 처리를 위해 선택한 AI 플랫폼으로 전송됩니다.', 'API Key 仅保存在本机 Chrome 扩展存储中。': 'API 키는 이 기기의 Chrome 확장 프로그램 저장소에만 보관됩니다.', '来源图、角色/物品素材、提示词和生成结果保存在本机，可随时删除。': '원본 이미지, 인물/사물 소재, 프롬프트 및 생성 결과는 기기에 저장되며 언제든 삭제할 수 있습니다.', '插件不出售数据，也不将数据用于广告或用户画像。': '확장 프로그램은 데이터를 판매하지 않으며 광고나 사용자 프로파일링에 사용하지 않습니다.'
  , '可以直接编辑提示词': '프롬프트를 편집할 수 있습니다', '未启用反推模型': '활성화된 분석 모델이 없습니다', '未启用生图模型': '활성화된 이미지 모델이 없습니다', '尚未启用生图模型': '활성화된 이미지 모델이 없습니다', '默认生图': '기본 이미지 모델', '已设为默认反推模型': '기본 분석 모델을 변경했습니다', '已设为默认生图模型': '기본 이미지 모델을 변경했습니다', '请先反推或输入提示词': '먼저 프롬프트를 분석하거나 입력하세요', '正在反推提示词，已等待 {seconds} 秒…': '프롬프트 분석 중 · {seconds}초 경과…', '正在生成，已等待 {seconds} 秒…': '생성 중 · {seconds}초 경과…', '正在生成组图，已等待 {seconds} 秒…': '이미지 세트 생성 중 · {seconds}초 경과…', '已等待 {seconds} 秒…': '{seconds}초 경과…', '请在网页中拖动框选截图区域，按 Esc 可取消': '페이지에서 드래그하여 캡처 영역을 선택하세요. Esc를 누르면 취소됩니다.', '在相册中查看组图第 {index} 张，共 {count} 张': '앨범에서 {count}개 중 {index}번째 이미지 보기', '点击在相册中查看大图': '클릭하여 앨범에서 크게 보기', '组图第 {index} 张，共 {count} 张': '{count}개 중 {index}번째 이미지', '提示词已复制': '프롬프트를 복사했습니다', '魔法按钮已显示，点击隐藏': '매직 버튼이 표시 중입니다. 클릭하여 숨기기', '魔法按钮已隐藏，点击显示': '매직 버튼이 숨겨져 있습니다. 클릭하여 표시'
  , '新平台': '새 플랫폼', '尚未获取模型，可自动获取或手动添加。': '모델이 없습니다. 자동으로 가져오거나 직접 추가하세요.', '未启用的模型已隐藏，可打开上方开关查看。': '비활성 모델은 숨겨져 있습니다. 위 스위치로 표시할 수 있습니다.', '移除模型': '모델 제거', '未命名平台': '이름 없는 플랫폼', '已添加接口': '추가된 API', '删除平台': '플랫폼 삭제', '平台名称': '플랫폼 이름', '显示': '표시', '隐藏': '숨기기', '自动获取模型': '모델 자동 가져오기', '手动输入模型名称': '모델 이름 직접 입력', '添加': '추가', '模型名称与启用能力': '모델 및 기능', '显示未启用模型': '비활성 모델 표시', '文生图': '텍스트 이미지 생성', '编辑': '편집', '模型能力图例': '모델 기능 범례', '适合反推': '이미지 분석에 적합', '适合文生图': '텍스트 이미지 생성에 적합', '适合图像编辑': '이미지 편집에 적합', '尚未启用模型': '활성화된 모델 없음'
  , '✨ 反推提示词并生成同款': '✨ 프롬프트 분석 및 생성', '🖼 打开 EchoShot · 拍同款相册': '🖼 EchoShot · 拍同款 앨범 열기'
  , '无法对比': '비교할 수 없음', '无原图': '원본 없음', '开启对比': '비교 켜기', '关闭对比': '비교 끄기', '✓ 已在角色库': '✓ 라이브러리에 있음', '已在角色库': '인물 및 사물 라이브러리에 있음', '正在添加…': '추가 중…', '正在添加到角色库…': '인물 및 사물 라이브러리에 추가 중…', '这张图片已经在角色与物品库中': '이 이미지는 이미 인물 및 사물 라이브러리에 있습니다', '已添加到角色与物品库': '인물 및 사물 라이브러리에 추가했습니다', '确定删除这张图片吗？此操作不可恢复。': '이 이미지를 삭제할까요? 이 작업은 되돌릴 수 없습니다.', '已删除': '삭제됨'
  , '2 张': '2개', '4 张': '4개', '6 张': '6개', '8 张': '8개', '上一张（←）': '이전 이미지(←)', '下一张（→）': '다음 이미지(→)'
  , '反 {count}': '분석 {count}', '图 {count}': '이미지 {count}', '正在获取…': '가져오는 중…', '获取中…': '가져오는 중…', '已获取 {total} 个，新增 {added} 个': '{total}개 가져옴, {added}개 추가', '已获取 {total} 个（反推 {vision}，生图 {image}），新增 {added} 个': '{total}개 가져옴(분석 {vision}, 이미지 {image}), {added}개 추가', '正在获取工作流名称…': '워크플로 이름을 가져오는 중…', '已自动填入工作流名称': '워크플로 이름을 자동으로 입력했습니다', '未获取到工作流名称，可手动填写别名': '워크플로 이름을 가져오지 못했습니다. 별칭을 직접 입력하세요', '模型已在列表中': '모델이 이미 목록에 있습니다', '再次点击删除': '다시 클릭하여 삭제'
  , '浏览网页时，把鼠标悬停在图片上，点击右上角出现的魔法按钮，即可反推提示词并生成同款图片。': '웹 이미지에 마우스를 올리고 오른쪽 위의 매직 버튼을 클릭하면 프롬프트를 분석하고 비슷한 이미지를 생성할 수 있습니다.', '也可以在图片上点右键，选择「✨ 反推提示词并生成同款」。': '이미지를 마우스 오른쪽 버튼으로 클릭하고 “✨ 프롬프트 분석 및 생성”을 선택할 수도 있습니다.', '保持构图、背景和光影基本不变，只替换目标人物、角色或物品。请选择支持图生图/edit 的模型。': '구도, 배경 및 조명을 유지하면서 대상 인물이나 사물만 교체합니다. 이미지 편집을 지원하는 모델을 선택하세요.', '正在生成，通常需要 10–60 秒…': '생성 중입니다. 보통 10~60초가 걸립니다…', '反推得到的提示词会显示在这里，可以直接编辑': '분석한 프롬프트가 여기에 표시되며 직접 편집할 수 있습니다', '切换并保存为默认反推模型': '전환 후 기본 분석 모델로 저장', '切换并保存为默认生图模型': '전환 후 기본 이미지 모델로 저장'
  , '每个平台独立保存 API 地址和密钥。密钥仅保存在本机浏览器中；执行反推或生图时，所选图片和提示词会发送到你选择的 AI 平台。': '각 플랫폼의 API 주소와 키는 별도로 저장됩니다. 키는 이 브라우저에만 보관되며 작업 실행 시에만 선택한 이미지와 프롬프트가 선택한 AI 플랫폼으로 전송됩니다.', '支持 OpenAI 兼容的': 'OpenAI 호환', '侧边栏切换模型会自动保存；在这里修改后，请点击“保存设置”。后续任务都会使用新的默认值。': '사이드 패널에서 모델을 변경하면 자동 저장됩니다. 여기서 변경한 경우 “설정 저장”을 클릭하세요.', '比例会映射为生图接口的 size 参数，请按所选模型支持的尺寸填写。': '비율은 이미지 API의 size 매개변수에 대응합니다. 선택한 모델이 지원하는 크기를 입력하세요.', '插件会根据模型协议提交对应选项；不支持 Quality 或分辨率档位的模型仍使用上方像素尺寸。': '모델 프로토콜에 따라 품질 옵션을 전송하며, 지원하지 않는 모델은 위 픽셀 크기를 사용합니다.'
  , '“拍同款”是一款由用户自行配置 AI 平台 API Key 的 Chrome 扩展，用于分析用户主动选择的网页图片、生成复刻提示词及同款图片，并在本机管理生成记录。': '“같은 이미지 만들기”는 사용자가 직접 AI 플랫폼 API 키를 설정하고 명시적으로 선택한 웹 이미지를 분석하여 재현 프롬프트와 유사 이미지를 생성하고 결과를 로컬에서 관리하는 Chrome 확장 프로그램입니다.', 'API 配置：': 'API 설정:', '平台名称、Base URL、模型名称及用户填写的 API Key。': '플랫폼 이름, Base URL, 모델 이름 및 사용자가 입력한 API 키.', '主动选择的内容：': '사용자가 선택한 콘텐츠:', '网页图片、用户主动框选截取的当前可见页面区域、图片地址、所在页面 URL 和页面标题。': '웹 이미지, 사용자가 직접 캡처한 현재 보이는 페이지 영역, 이미지 URL, 페이지 URL 및 제목.', '替换参考素材：': '교체 참고 소재:', '用户添加到本机角色与物品库中的图片和名称。': '로컬 인물 및 사물 라이브러리에 추가한 이미지와 이름.', '用户生成内容：': '사용자 생성 콘텐츠:', '反推提示词、用户编辑后的提示词、生成图片及生成参数。': '분석 프롬프트, 사용자가 편집한 프롬프트, 생성 이미지 및 생성 매개변수.', '本地任务状态：': '로컬 작업 상태:', '当前任务、模型选择、相册记录和界面设置。': '현재 작업, 모델 선택, 앨범 기록 및 인터페이스 설정.', '扩展不收集姓名、邮箱、通讯录、精确位置、支付卡信息，也不创建跨网站用户画像。': '이름, 이메일, 연락처, 정확한 위치 또는 결제 카드 정보를 수집하지 않으며 사이트 간 사용자 프로필을 만들지 않습니다.'
  , '只有当用户点击反推、生成、替换角色或组图生成时，扩展才会将完成任务所必需的来源图、参考素材和提示词发送到用户选定的 AI 平台。': '사용자가 분석, 생성, 인물 교체 또는 이미지 세트 작업을 시작할 때만 필요한 원본 이미지, 참고 소재 및 프롬프트를 선택한 AI 플랫폼으로 전송합니다.', 'API Key 仅用于向该平台鉴权。扩展开发者不运营中转服务器，也不会接收用户的 API Key、图片或提示词。': 'API 키는 선택한 플랫폼 인증에만 사용됩니다. 개발자는 중계 서버를 운영하지 않으며 사용자의 API 키, 이미지 또는 프롬프트를 받지 않습니다.', '内置平台包括 OpenAI、ModelScope、SiliconFlow、Agnes-AI、ZenMux、RunningHUB、AtlasCloud、APImart、OpenRouter、QianwenAI、Aliyun Token Plan 和 fal.ai；用户也可以配置自己的兼容服务。': '내장 플랫폼에는 OpenAI, ModelScope, SiliconFlow, Agnes-AI, ZenMux, RunningHUB, AtlasCloud, APImart, OpenRouter, QianwenAI, Aliyun Token Plan 및 fal.ai가 있으며 호환 서비스를 직접 설정할 수도 있습니다.', '第三方平台如何保存和处理请求，由相应平台的隐私政策及用户与该平台之间的协议决定。': '타사 플랫폼의 요청 저장 및 처리는 각 플랫폼의 개인정보 처리방침과 사용자 계약을 따릅니다.', '除完成用户明确请求的反推、生图，或法律、安全所必需的情形外，扩展不会向其他第三方传输数据。': '사용자가 명시적으로 요청한 작업 수행 또는 법률·보안상 필요한 경우를 제외하고 다른 제3자에게 데이터를 전송하지 않습니다.'
  , 'API 配置保存在': 'API 설정은', '，并限制为扩展可信页面和后台访问。': '에 저장되며 신뢰할 수 있는 확장 페이지와 백그라운드에서만 접근할 수 있습니다.', '当前任务临时保存在': '현재 작업은 임시로', '。': '.', '来源图、角色/物品参考素材、提示词和生成图片保存在本机 IndexedDB 中。': '원본 이미지, 인물/사물 참고 소재, 프롬프트 및 생성 이미지는 로컬 IndexedDB에 저장됩니다.', '用户可以删除 API Key、参考素材和相册作品；卸载扩展会清除 Chrome 管理的扩展本地数据。': 'API 키, 참고 소재 및 앨범 작품을 삭제할 수 있으며 확장 프로그램을 제거하면 Chrome이 관리하는 로컬 데이터도 삭제됩니다.', '预设 AI 平台均使用 HTTPS。': '기본 AI 플랫폼은 HTTPS를 사용합니다.', '自定义 API Base URL 必须使用 HTTPS；仅本机 localhost 调试允许 HTTP。': '사용자 지정 API Base URL은 HTTPS를 사용해야 하며 localhost 개발 시에만 HTTP가 허용됩니다.', '扩展不加载或执行远程 JavaScript，全部运行逻辑均包含在安装包中。': '원격 JavaScript를 불러오거나 실행하지 않으며 모든 실행 로직은 설치 패키지에 포함됩니다.', '扩展不会出售用户数据，不会将用户数据用于个性化广告、再营销、信用评估或数据经纪，也不会允许开发者或其他人员读取用户内容；法律义务或用户明确请求的支持情形除外。': '사용자 데이터를 판매하거나 맞춤 광고, 리마케팅, 신용 평가 또는 데이터 중개에 사용하지 않습니다. 법적 의무나 사용자가 명시적으로 요청한 지원을 제외하고 개발자 또는 다른 사람이 사용자 콘텐츠를 읽을 수 없습니다.', '扩展对用户数据的使用遵守 Chrome Web Store User Data Policy，包括 Limited Use 要求。': '사용자 데이터 사용은 Limited Use 요건을 포함한 Chrome Web Store User Data Policy를 준수합니다.', '扩展并非专门面向儿童，也不会有意收集儿童个人信息。': '아동을 대상으로 하지 않으며 아동의 개인정보를 의도적으로 수집하지 않습니다.', '如数据处理方式发生实质变化，扩展会在实施前通过产品界面提示，并在需要时重新征得同意。有关隐私的问题，可通过 Chrome Web Store 商品页面的“支持”入口联系发布者。': '데이터 처리 방식이 크게 변경되면 적용 전에 제품 화면에서 알리고 필요한 경우 다시 동의를 받습니다. 개인정보 관련 문의는 Chrome Web Store 상품 페이지의 지원 링크를 통해 게시자에게 연락할 수 있습니다.'
};

JA['更新日期：2026 年 7 月 22 日'] = '更新日：2026年7月22日';
KO['更新日期：2026 年 7 月 22 日'] = '업데이트: 2026년 7월 22일';

Object.assign(EN, {
  '停止任务': 'Stop',
  '正在停止任务': 'Stopping task',
  '正在停止任务…': 'Stopping task…',
  '任务已停止': 'Task stopped',
  '选择创作方式': 'Choose how to create',
  '🎲 惊喜': '🎲 Surprise',
  '手动输入': 'Enter a prompt',
  '当前没有可停止的任务': 'There is no active task to stop',
  '已请求停止任务；当前已提交的图片仍会完成并保存': 'Stop requested. Any image already submitted will still finish and be saved.',
  '停止任务失败：{error}': 'Could not stop task: {error}',
  '取消截图失败：{error}': 'Could not cancel area capture: {error}',
  '惊喜随机提示词': 'Surprise Prompt',
  '🎲 给我惊喜': '🎲 Surprise Me',
  '给我惊喜': 'Surprise Me',
  '第一次使用？': 'First time here?',
  '如果您是第一次使用，请先打开设置，添加API key，并配置好默认模型。': 'If this is your first time, open Settings, add your API key, and choose the default models.',
  '打开设置': 'Open Settings',
  '将鼠标移到网页图片上，点击魔法按钮；目标不是图片时，可使用框选截图。': 'Hover over a web image and click the magic button. If the target is not an image, capture an area instead.',
  '也可以直接使用“惊喜创作”，随机生成提示词后再生成图片。': 'Or use Surprise Mode to create a random prompt, then generate an image.',
  '惊喜创作模式': 'Surprise Mode',
  '惊喜模式下不可用': 'Unavailable in Surprise Mode',
  '惊喜模式没有参考图片，无法替换角色或物品。请先选择一张来源图片。': 'Surprise Mode has no reference image, so characters or objects cannot be replaced. Select a source image first.',
  'AI 随机创作': 'AI Random Creation',
  '正在生成惊喜提示词…': 'Generating a surprise prompt…',
  'AI反推模型': 'AI Vision Model',
  '图片比例': 'Image Aspect Ratio',
  'AI生图模型': 'AI Image Generation Model',
  'AI惊喜提示词生成中…': 'AI is creating a surprise prompt…',
  '正在调用所选反推模型，请稍候': 'Calling the selected analysis model. Please wait.',
  '生成惊喜提示词失败': 'Could not generate the surprise prompt',
  '生成惊喜提示词失败：{error}': 'Could not generate the surprise prompt: {error}',
  '反推模型未返回随机提示词': 'The analysis model returned no surprise prompt',
  '已保存为默认反推模型，将在下次惊喜生成时生效': 'Saved as the default vision model. It will apply to the next Surprise prompt.',
  '不使用参考图': 'No reference image',
  '再来一次': 'Try Again',
  '写实摄影': 'Realistic Photo',
  '电影剧照': 'Film Still',
  '插画/平面': 'Illustration',
  '3D/实体艺术': '3D / Physical Art',
  '惊喜提示词已生成': 'Surprise prompt ready',
  '惊喜模式需要文生图模型，请切换到支持文生图的模型': 'Surprise mode needs a text-to-image model. Switch to a model that supports text-to-image.',
  '当前模型仅支持图片编辑，请切换到支持文生图的模型': 'The selected model only supports image editing. Switch to a text-to-image model.',
  '任务已停止，当前已完成的图片已保存': 'Task stopped. The completed image has been saved.',
  '任务已停止，已保留 {count} 张图片': 'Task stopped. {count} image(s) were kept.',
  '已设为默认比例': 'Default aspect ratio updated',
  '保存默认比例失败：{error}': 'Could not save the default aspect ratio: {error}',
  '保存默认模型失败：{error}': 'Could not save the default model: {error}',
  '操作失败：{error}': 'Operation failed: {error}',
  '读取图片状态失败：{error}': 'Could not read image status: {error}',
  '正在处理当前页面图片…': 'Processing the image from this page…',
  '图片获取失败：{error}': 'Could not load image: {error}',
  '原图尺寸 {width}×{height}': 'Original size {width}×{height}',
  '恢复上次任务失败：{error}': 'Could not restore the previous task: {error}',
  '反推失败：{error}': 'Prompt analysis failed: {error}',
  '未知错误': 'Unknown error',
  '当前生图模型需要来源图片，请先选择图片': 'The selected image model requires a source image. Select one first.',
  '上一张图片生成失败：{error}': 'The previous image failed: {error}',
  '生成失败：{error}': 'Generation failed: {error}',
  '上一张图片的生成已完成，已保存到相册': 'The previous image is complete and has been saved to the album.',
  '无法开始截图：{error}': 'Could not start capture: {error}',
  '请确认当前是普通网页': 'Make sure the current tab is a regular web page',
  '扩展尚未连接当前网页，请刷新页面后重试': 'The extension is not connected to this page yet. Refresh the page and try again.',
  '当前页面截图权限不可用，请返回网页后重新点击框选截图': 'Capture permission is unavailable for this tab. Return to the page and click Capture Area again.',
  '当前页面不允许扩展运行，请在普通 HTTP/HTTPS 网页中使用': 'Extensions cannot run on this page. Open a regular HTTP/HTTPS webpage and try again.',
  '未找到当前网页标签': 'The current webpage tab could not be found.',
  '当前页面不支持截图，请在普通 HTTP/HTTPS 网页中使用': 'This page cannot be captured. Open a regular HTTP/HTTPS webpage and try again.',
  '无法进入框选模式': 'Could not enter area-selection mode.',
  '截图区域无效，请重新框选': 'The selected area is invalid. Draw the capture area again.',
  '未找到需要截图的网页': 'The webpage to capture could not be found.',
  '裁切后的截图数据无效': 'The captured image data is invalid.',
  '裁切后的截图尺寸无效': 'The captured image size is invalid.',
  '当前已有生成任务进行中': 'A generation task is already running',
  '请先选择需要修改的图片': 'Select an image to edit first',
  '当前模型最多支持 1 张参考图，无法替换角色或物品；请切换到支持多参考图的模型': 'This model supports only one reference image and cannot replace a character or object. Switch to a model that supports multiple references.',
  '当前 OpenRouter 模型不支持图片编辑，请切换生图模型': 'The selected OpenRouter model does not support image editing. Switch image models.',
  '正在替换角色或者物品…': 'Replacing the person or object…',
  '正在替换角色或者物品，已等待 {seconds} 秒…': 'Replacing the person or object, {seconds}s elapsed…',
  '上一张图片的替换已完成，已保存到相册': 'The replacement for the previous image is complete and saved to the album.',
  '替换失败：{error}': 'Replacement failed: {error}',
  '{label}完成，已保存到相册': '{label} complete and saved to the album',
  '角色/物品替换': 'Person/object replacement',
  '{stage}，已等待 {seconds} 秒…': '{stage} · {seconds}s elapsed…',
  '{count} 张组图已完成并保存到相册；用时 {seconds} 秒。': '{count} images completed and saved to the album in {seconds}s.',
  '组图生成中断：{error}{saved}': 'Image set interrupted: {error}{saved}',
  '；已保留前 {count} 张。': '; kept the first {count} image(s).',
  '{action}失败：{error}': '{action} failed: {error}',
  '替换': 'Replacement',
  '生成': 'Generation',
  '缺少原作品提示词': 'The original prompt is missing',
  '缺少组图来源大图，请从相册大图重新发起': 'The source image is missing. Start the image set again from the album viewer.',
  '正在基于当前大图生成主体锚点 {current}/{total}': 'Creating identity anchor {current}/{total} from the current image',
  '正在基于主体锚点生成第 {current}/{total} 张': 'Generating image {current}/{total} from the identity anchor',
  '正在使用文生图生成第 {current}/{total} 张': 'Generating text-to-image {current}/{total}',
  '当前模型不支持图生图，正在使用文生图生成第 {current}/{total} 张': 'This model does not support image editing; generating text-to-image {current}/{total}',
  '当前模型不支持图生图，已自动切换为文生图组图': 'This model does not support image editing. Switched to text-to-image automatically.',
  '组图完成：已保存 {count} 张': 'Image set complete: {count} saved',
  '上一张图片的组图任务已结束，请到相册查看已保存结果': 'The previous image-set task ended. Check the album for saved results.',
  '组图生成中断（已等待 {seconds} 秒）：{error}{saved}': 'Image set interrupted after {seconds}s: {error}{saved}',
  '；已保留并保存前 {count} 张。': '; kept and saved the first {count} image(s).',
  '已保存前 {count} 张，后续生成失败': 'Saved the first {count} image(s); later generations failed',
  '组图生成失败': 'Image-set generation failed',
  '未找到相册作品': 'Album item not found',
  '这张图片还未保存到相册': 'This image has not been saved to the album yet',
  '保存授权失败：{error}': 'Could not save consent: {error}',
  '初始化失败：{error}': 'Initialization failed: {error}',
  '正在调用生图模型': 'Calling the image model',
  '正在保存到相册': 'Saving to album',
  '正在编辑图片': 'Editing image',
  '正在生成同款图片': 'Generating a similar image',
  '正在生成': 'Generating',
  '正在打包 {count} 张图片…': 'Packaging {count} image(s)…',
  '为降低内存占用，将下载 {count} 个 ZIP 分包；请允许多文件下载': 'To reduce memory use, {count} ZIP files will be downloaded. Allow multiple downloads.',
  '已删除 {count} 张图片': 'Deleted {count} image(s)',
  '打开设置失败：{error}': 'Could not open settings: {error}',
  '添加到角色库失败：{error}': 'Could not add to the person/object library: {error}',
  '尚未取得当前窗口信息，请稍后重试': 'Window information is not available yet. Try again shortly.',
  '已在独立窗口中打开': 'Opened in a separate window',
  '打开侧边栏失败：{error}': 'Could not open the side panel: {error}',
  '请先填写 Base URL 和 API Key': 'Enter the Base URL and API Key first',
  '请输入新的模型名称': 'Enter a new model name'
});

Object.assign(JA, {
  '停止任务': '停止',
  '正在停止任务': 'タスクを停止中',
  '正在停止任务…': 'タスクを停止中…',
  '任务已停止': 'タスクを停止しました',
  '选择创作方式': '作成方法を選択',
  '🎲 惊喜': '🎲 サプライズ',
  '手动输入': '手動入力',
  '当前没有可停止的任务': '停止できる実行中のタスクはありません',
  '已请求停止任务；当前已提交的图片仍会完成并保存': '停止を要求しました。送信済みの画像は完了後に保存されます。',
  '停止任务失败：{error}': 'タスクを停止できませんでした：{error}',
  '取消截图失败：{error}': '範囲キャプチャをキャンセルできませんでした：{error}',
  '惊喜随机提示词': 'ランダムプロンプト',
  '🎲 给我惊喜': '🎲 おまかせ',
  '给我惊喜': 'おまかせ',
  '第一次使用？': '初めて使いますか？',
  '如果您是第一次使用，请先打开设置，添加API key，并配置好默认模型。': '初めて使う場合は、設定を開いてAPIキーを追加し、既定のモデルを設定してください。',
  '打开设置': '設定を開く',
  '将鼠标移到网页图片上，点击魔法按钮；目标不是图片时，可使用框选截图。': 'ウェブ画像にカーソルを合わせてマジックボタンを押します。画像でない対象は範囲キャプチャを使用できます。',
  '也可以直接使用“惊喜创作”，随机生成提示词后再生成图片。': '「おまかせ」を使ってランダムなプロンプトを作り、そのまま画像を生成することもできます。',
  '惊喜创作模式': 'ランダム生成モード',
  '惊喜模式下不可用': 'ランダム生成モードでは使用不可',
  '惊喜模式没有参考图片，无法替换角色或物品。请先选择一张来源图片。': 'ランダム生成モードには参照画像がないため、人物やアイテムを置換できません。先に元画像を選択してください。',
  'AI 随机创作': 'AIランダム生成',
  '正在生成惊喜提示词…': 'ランダムプロンプトを生成中…',
  'AI反推模型': 'AI解析モデル',
  '图片比例': '画像のアスペクト比',
  'AI生图模型': 'AI画像生成モデル',
  'AI惊喜提示词生成中…': 'AIがランダムプロンプトを生成中…',
  '正在调用所选反推模型，请稍候': '選択した解析モデルを呼び出しています。しばらくお待ちください。',
  '生成惊喜提示词失败': 'ランダムプロンプトを生成できませんでした',
  '生成惊喜提示词失败：{error}': 'ランダムプロンプトを生成できませんでした：{error}',
  '反推模型未返回随机提示词': '解析モデルからランダムプロンプトが返されませんでした',
  '已保存为默认反推模型，将在下次惊喜生成时生效': 'デフォルト解析モデルとして保存しました。次回のランダムプロンプト生成から適用されます。',
  '不使用参考图': '参照画像なし',
  '再来一次': 'もう一度',
  '写实摄影': 'リアル写真',
  '电影剧照': '映画スチル',
  '插画/平面': 'イラスト',
  '3D/实体艺术': '3D・立体アート',
  '惊喜提示词已生成': 'ランダムプロンプトを生成しました',
  '惊喜模式需要文生图模型，请切换到支持文生图的模型': 'ランダム生成にはテキスト画像生成モデルが必要です。対応モデルに切り替えてください。',
  '当前模型仅支持图片编辑，请切换到支持文生图的模型': '選択中のモデルは画像編集専用です。テキスト画像生成対応モデルに切り替えてください。',
  '任务已停止，当前已完成的图片已保存': 'タスクを停止しました。完了した画像は保存済みです。',
  '任务已停止，已保留 {count} 张图片': 'タスクを停止し、{count}枚を保存しました。',
  '已设为默认比例': 'デフォルト比率を更新しました',
  '保存默认比例失败：{error}': 'デフォルト比率を保存できませんでした：{error}',
  '保存默认模型失败：{error}': '既定モデルを保存できませんでした：{error}',
  '操作失败：{error}': '操作に失敗しました：{error}',
  '读取图片状态失败：{error}': '画像状態を取得できませんでした：{error}',
  '正在处理当前页面图片…': '現在のページの画像を処理中…',
  '图片获取失败：{error}': '画像を取得できませんでした：{error}',
  '原图尺寸 {width}×{height}': '元画像サイズ {width}×{height}',
  '恢复上次任务失败：{error}': '前回のタスクを復元できませんでした：{error}',
  '反推失败：{error}': 'プロンプト解析に失敗しました：{error}',
  '未知错误': '不明なエラー',
  '当前生图模型需要来源图片，请先选择图片': '選択したモデルには元画像が必要です。先に画像を選択してください。',
  '上一张图片生成失败：{error}': '前の画像生成に失敗しました：{error}',
  '生成失败：{error}': '生成に失敗しました：{error}',
  '上一张图片的生成已完成，已保存到相册': '前の画像生成が完了し、アルバムに保存されました。',
  '无法开始截图：{error}': 'キャプチャを開始できません：{error}',
  '请确认当前是普通网页': '通常のWebページを開いているか確認してください',
  '扩展尚未连接当前网页，请刷新页面后重试': '拡張機能がこのページに接続されていません。ページを再読み込みして、もう一度お試しください。',
  '当前页面截图权限不可用，请返回网页后重新点击框选截图': 'このタブではキャプチャ権限を使用できません。Webページに戻り、もう一度範囲キャプチャを押してください。',
  '当前页面不允许扩展运行，请在普通 HTTP/HTTPS 网页中使用': 'このページでは拡張機能を実行できません。通常のHTTP/HTTPSページでお試しください。',
  '未找到当前网页标签': '現在のWebページタブが見つかりません。',
  '当前页面不支持截图，请在普通 HTTP/HTTPS 网页中使用': 'このページはキャプチャできません。通常のHTTP/HTTPSページでお試しください。',
  '无法进入框选模式': '範囲選択モードを開始できません。',
  '截图区域无效，请重新框选': '選択範囲が無効です。もう一度範囲を選択してください。',
  '未找到需要截图的网页': 'キャプチャするWebページが見つかりません。',
  '裁切后的截图数据无效': 'キャプチャした画像データが無効です。',
  '裁切后的截图尺寸无效': 'キャプチャした画像サイズが無効です。',
  '当前已有生成任务进行中': '生成タスクがすでに実行中です',
  '请先选择需要修改的图片': '編集する画像を先に選択してください',
  '当前模型最多支持 1 张参考图，无法替换角色或物品；请切换到支持多参考图的模型': 'このモデルは参照画像を1枚しか使用できないため、人物や物を置換できません。複数参照対応モデルに切り替えてください。',
  '当前 OpenRouter 模型不支持图片编辑，请切换生图模型': '選択中のOpenRouterモデルは画像編集に対応していません。画像モデルを切り替えてください。',
  '正在替换角色或者物品…': '人物または物を置換中…',
  '正在替换角色或者物品，已等待 {seconds} 秒…': '人物または物を置換中 · {seconds}秒経過…',
  '上一张图片的替换已完成，已保存到相册': '前の画像の置換が完了し、アルバムに保存されました。',
  '替换失败：{error}': '置換に失敗しました：{error}',
  '{label}完成，已保存到相册': '{label}が完了し、アルバムに保存されました',
  '角色/物品替换': '人物・物の置換',
  '{stage}，已等待 {seconds} 秒…': '{stage} · {seconds}秒経過…',
  '{count} 张组图已完成并保存到相册；用时 {seconds} 秒。': '{count}枚を生成し、アルバムに保存しました（{seconds}秒）。',
  '组图生成中断：{error}{saved}': '画像セットの生成が中断されました：{error}{saved}',
  '；已保留前 {count} 张。': '；最初の{count}枚を保持しました。',
  '{action}失败：{error}': '{action}に失敗しました：{error}',
  '替换': '置換',
  '生成': '生成',
  '缺少原作品提示词': '元作品のプロンプトがありません',
  '缺少组图来源大图，请从相册大图重新发起': '元画像がありません。アルバムの拡大表示から再実行してください。',
  '正在基于当前大图生成主体锚点 {current}/{total}': '現在の画像から主体アンカーを作成中 {current}/{total}',
  '正在基于主体锚点生成第 {current}/{total} 张': '主体アンカーから画像を生成中 {current}/{total}',
  '正在使用文生图生成第 {current}/{total} 张': 'テキストから画像を生成中 {current}/{total}',
  '当前模型不支持图生图，正在使用文生图生成第 {current}/{total} 张': 'このモデルは画像編集非対応のため、テキストから生成中 {current}/{total}',
  '当前模型不支持图生图，已自动切换为文生图组图': '画像編集非対応のため、テキスト生成に自動切替しました。',
  '组图完成：已保存 {count} 张': '画像セット完了：{count}枚保存',
  '上一张图片的组图任务已结束，请到相册查看已保存结果': '前の画像セットタスクが終了しました。保存結果はアルバムで確認できます。',
  '组图生成中断（已等待 {seconds} 秒）：{error}{saved}': '画像セットが{seconds}秒後に中断：{error}{saved}',
  '；已保留并保存前 {count} 张。': '；最初の{count}枚を保存しました。',
  '已保存前 {count} 张，后续生成失败': '最初の{count}枚を保存しましたが、後続の生成に失敗しました',
  '组图生成失败': '画像セットの生成に失敗しました',
  '未找到相册作品': 'アルバム作品が見つかりません',
  '这张图片还未保存到相册': 'この画像はまだアルバムに保存されていません',
  '保存授权失败：{error}': '同意内容を保存できませんでした：{error}',
  '初始化失败：{error}': '初期化に失敗しました：{error}',
  '正在调用生图模型': '画像モデルを呼び出し中',
  '正在保存到相册': 'アルバムに保存中',
  '正在编辑图片': '画像を編集中',
  '正在生成同款图片': '同じスタイルの画像を生成中',
  '正在生成': '生成中',
  '正在打包 {count} 张图片…': '{count}枚をパッケージ中…',
  '为降低内存占用，将下载 {count} 个 ZIP 分包；请允许多文件下载': 'メモリ使用量を抑えるため{count}個のZIPをダウンロードします。複数ダウンロードを許可してください。',
  '已删除 {count} 张图片': '{count}枚を削除しました',
  '打开设置失败：{error}': '設定を開けません：{error}',
  '添加到角色库失败：{error}': '人物・物ライブラリに追加できません：{error}',
  '尚未取得当前窗口信息，请稍后重试': 'ウィンドウ情報を取得中です。少し待って再試行してください。',
  '已在独立窗口中打开': '別ウィンドウで開きました',
  '打开侧边栏失败：{error}': 'サイドパネルを開けません：{error}',
  '请先填写 Base URL 和 API Key': '先にBase URLとAPI Keyを入力してください',
  '请输入新的模型名称': '新しいモデル名を入力してください'
});

Object.assign(KO, {
  '停止任务': '중지',
  '正在停止任务': '작업 중지 중',
  '正在停止任务…': '작업 중지 중…',
  '任务已停止': '작업이 중지되었습니다',
  '选择创作方式': '생성 방식 선택',
  '🎲 惊喜': '🎲 서프라이즈',
  '手动输入': '직접 입력',
  '当前没有可停止的任务': '중지할 실행 중인 작업이 없습니다',
  '已请求停止任务；当前已提交的图片仍会完成并保存': '중지를 요청했습니다. 이미 제출된 이미지는 완료 후 저장됩니다.',
  '停止任务失败：{error}': '작업을 중지하지 못했습니다: {error}',
  '取消截图失败：{error}': '영역 캡처를 취소하지 못했습니다: {error}',
  '惊喜随机提示词': '랜덤 프롬프트',
  '🎲 给我惊喜': '🎲 랜덤 생성',
  '给我惊喜': '랜덤 생성',
  '第一次使用？': '처음 사용하시나요?',
  '如果您是第一次使用，请先打开设置，添加API key，并配置好默认模型。': '처음 사용하는 경우 설정을 열고 API 키를 추가한 다음 기본 모델을 지정하세요.',
  '打开设置': '설정 열기',
  '将鼠标移到网页图片上，点击魔法按钮；目标不是图片时，可使用框选截图。': '웹 이미지에 마우스를 올리고 마법 버튼을 누르세요. 이미지가 아닌 대상은 영역 캡처를 사용할 수 있습니다.',
  '也可以直接使用“惊喜创作”，随机生成提示词后再生成图片。': '또는 랜덤 생성을 사용해 프롬프트를 만든 뒤 이미지를 생성할 수 있습니다.',
  '惊喜创作模式': '랜덤 생성 모드',
  '惊喜模式下不可用': '랜덤 생성 모드에서 사용할 수 없음',
  '惊喜模式没有参考图片，无法替换角色或物品。请先选择一张来源图片。': '랜덤 생성 모드에는 참고 이미지가 없어 인물이나 사물을 교체할 수 없습니다. 먼저 원본 이미지를 선택하세요.',
  'AI 随机创作': 'AI 랜덤 생성',
  '正在生成惊喜提示词…': '랜덤 프롬프트 생성 중…',
  'AI反推模型': 'AI 분석 모델',
  '图片比例': '이미지 화면 비율',
  'AI生图模型': 'AI 이미지 생성 모델',
  'AI惊喜提示词生成中…': 'AI 랜덤 프롬프트 생성 중…',
  '正在调用所选反推模型，请稍候': '선택한 분석 모델을 호출하고 있습니다. 잠시 기다려 주세요.',
  '生成惊喜提示词失败': '랜덤 프롬프트를 생성하지 못했습니다',
  '生成惊喜提示词失败：{error}': '랜덤 프롬프트를 생성하지 못했습니다: {error}',
  '反推模型未返回随机提示词': '분석 모델이 랜덤 프롬프트를 반환하지 않았습니다',
  '已保存为默认反推模型，将在下次惊喜生成时生效': '기본 분석 모델로 저장했습니다. 다음 랜덤 프롬프트 생성부터 적용됩니다.',
  '不使用参考图': '참조 이미지 없음',
  '再来一次': '다시 생성',
  '写实摄影': '사실적 사진',
  '电影剧照': '영화 스틸',
  '插画/平面': '일러스트',
  '3D/实体艺术': '3D·입체 아트',
  '惊喜提示词已生成': '랜덤 프롬프트가 준비되었습니다',
  '惊喜模式需要文生图模型，请切换到支持文生图的模型': '랜덤 생성에는 텍스트 이미지 생성 모델이 필요합니다. 지원 모델로 전환하세요.',
  '当前模型仅支持图片编辑，请切换到支持文生图的模型': '선택한 모델은 이미지 편집 전용입니다. 텍스트 이미지 생성 모델로 전환하세요.',
  '任务已停止，当前已完成的图片已保存': '작업이 중지되었습니다. 완료된 이미지는 저장되었습니다.',
  '任务已停止，已保留 {count} 张图片': '작업이 중지되었습니다. 이미지 {count}장을 보관했습니다.',
  '已设为默认比例': '기본 비율을 변경했습니다',
  '保存默认比例失败：{error}': '기본 비율을 저장하지 못했습니다: {error}',
  '保存默认模型失败：{error}': '기본 모델을 저장하지 못했습니다: {error}',
  '操作失败：{error}': '작업 실패: {error}',
  '读取图片状态失败：{error}': '이미지 상태를 읽지 못했습니다: {error}',
  '正在处理当前页面图片…': '현재 페이지 이미지를 처리 중…',
  '图片获取失败：{error}': '이미지를 가져오지 못했습니다: {error}',
  '原图尺寸 {width}×{height}': '원본 크기 {width}×{height}',
  '恢复上次任务失败：{error}': '이전 작업을 복원하지 못했습니다: {error}',
  '反推失败：{error}': '프롬프트 분석 실패: {error}',
  '未知错误': '알 수 없는 오류',
  '当前生图模型需要来源图片，请先选择图片': '선택한 이미지 모델에는 원본 이미지가 필요합니다. 먼저 이미지를 선택하세요.',
  '上一张图片生成失败：{error}': '이전 이미지 생성 실패: {error}',
  '生成失败：{error}': '생성 실패: {error}',
  '上一张图片的生成已完成，已保存到相册': '이전 이미지 생성이 완료되어 앨범에 저장되었습니다.',
  '无法开始截图：{error}': '캡처를 시작할 수 없습니다: {error}',
  '请确认当前是普通网页': '현재 탭이 일반 웹페이지인지 확인하세요',
  '扩展尚未连接当前网页，请刷新页面后重试': '확장 프로그램이 아직 이 페이지에 연결되지 않았습니다. 페이지를 새로고침한 후 다시 시도하세요.',
  '当前页面截图权限不可用，请返回网页后重新点击框选截图': '이 탭에서 캡처 권한을 사용할 수 없습니다. 웹페이지로 돌아가 영역 캡처를 다시 누르세요.',
  '当前页面不允许扩展运行，请在普通 HTTP/HTTPS 网页中使用': '이 페이지에서는 확장 프로그램을 실행할 수 없습니다. 일반 HTTP/HTTPS 웹페이지에서 다시 시도하세요.',
  '未找到当前网页标签': '현재 웹페이지 탭을 찾을 수 없습니다.',
  '当前页面不支持截图，请在普通 HTTP/HTTPS 网页中使用': '이 페이지는 캡처할 수 없습니다. 일반 HTTP/HTTPS 웹페이지에서 다시 시도하세요.',
  '无法进入框选模式': '영역 선택 모드를 시작할 수 없습니다.',
  '截图区域无效，请重新框选': '선택한 영역이 올바르지 않습니다. 다시 영역을 선택하세요.',
  '未找到需要截图的网页': '캡처할 웹페이지를 찾을 수 없습니다.',
  '裁切后的截图数据无效': '캡처한 이미지 데이터가 올바르지 않습니다.',
  '裁切后的截图尺寸无效': '캡처한 이미지 크기가 올바르지 않습니다.',
  '当前已有生成任务进行中': '이미 생성 작업이 실행 중입니다',
  '请先选择需要修改的图片': '먼저 편집할 이미지를 선택하세요',
  '当前模型最多支持 1 张参考图，无法替换角色或物品；请切换到支持多参考图的模型': '이 모델은 참조 이미지를 1장만 지원하므로 인물이나 사물을 교체할 수 없습니다. 다중 참조 지원 모델로 전환하세요.',
  '当前 OpenRouter 模型不支持图片编辑，请切换生图模型': '선택한 OpenRouter 모델은 이미지 편집을 지원하지 않습니다. 이미지 모델을 전환하세요.',
  '正在替换角色或者物品…': '인물 또는 사물을 교체 중…',
  '正在替换角色或者物品，已等待 {seconds} 秒…': '인물 또는 사물을 교체 중 · {seconds}초 경과…',
  '上一张图片的替换已完成，已保存到相册': '이전 이미지 교체가 완료되어 앨범에 저장되었습니다.',
  '替换失败：{error}': '교체 실패: {error}',
  '{label}完成，已保存到相册': '{label} 완료, 앨범에 저장됨',
  '角色/物品替换': '인물/사물 교체',
  '{stage}，已等待 {seconds} 秒…': '{stage} · {seconds}초 경과…',
  '{count} 张组图已完成并保存到相册；用时 {seconds} 秒。': '이미지 {count}장을 완료하여 앨범에 저장했습니다. {seconds}초 소요.',
  '组图生成中断：{error}{saved}': '이미지 세트 생성 중단: {error}{saved}',
  '；已保留前 {count} 张。': '; 처음 {count}장을 보관했습니다.',
  '{action}失败：{error}': '{action} 실패: {error}',
  '替换': '교체',
  '生成': '생성',
  '缺少原作品提示词': '원본 프롬프트가 없습니다',
  '缺少组图来源大图，请从相册大图重新发起': '원본 이미지가 없습니다. 앨범 큰 이미지에서 다시 시작하세요.',
  '正在基于当前大图生成主体锚点 {current}/{total}': '현재 이미지로 주체 앵커 생성 중 {current}/{total}',
  '正在基于主体锚点生成第 {current}/{total} 张': '주체 앵커로 이미지 생성 중 {current}/{total}',
  '正在使用文生图生成第 {current}/{total} 张': '텍스트로 이미지 생성 중 {current}/{total}',
  '当前模型不支持图生图，正在使用文生图生成第 {current}/{total} 张': '이 모델은 이미지 편집을 지원하지 않아 텍스트로 생성 중 {current}/{total}',
  '当前模型不支持图生图，已自动切换为文生图组图': '이미지 편집을 지원하지 않아 텍스트 이미지 세트로 자동 전환했습니다.',
  '组图完成：已保存 {count} 张': '이미지 세트 완료: {count}장 저장',
  '上一张图片的组图任务已结束，请到相册查看已保存结果': '이전 이미지 세트 작업이 종료되었습니다. 저장 결과는 앨범에서 확인하세요.',
  '组图生成中断（已等待 {seconds} 秒）：{error}{saved}': '이미지 세트가 {seconds}초 후 중단됨: {error}{saved}',
  '；已保留并保存前 {count} 张。': '; 처음 {count}장을 보관하고 저장했습니다.',
  '已保存前 {count} 张，后续生成失败': '처음 {count}장은 저장했지만 이후 생성에 실패했습니다',
  '组图生成失败': '이미지 세트 생성 실패',
  '未找到相册作品': '앨범 항목을 찾을 수 없습니다',
  '这张图片还未保存到相册': '이 이미지는 아직 앨범에 저장되지 않았습니다',
  '保存授权失败：{error}': '동의를 저장하지 못했습니다: {error}',
  '初始化失败：{error}': '초기화 실패: {error}',
  '正在调用生图模型': '이미지 모델 호출 중',
  '正在保存到相册': '앨범에 저장 중',
  '正在编辑图片': '이미지 편집 중',
  '正在生成同款图片': '같은 스타일 이미지 생성 중',
  '正在生成': '생성 중',
  '正在打包 {count} 张图片…': '이미지 {count}장 패키징 중…',
  '为降低内存占用，将下载 {count} 个 ZIP 分包；请允许多文件下载': '메모리 사용을 줄이기 위해 ZIP {count}개를 다운로드합니다. 여러 파일 다운로드를 허용하세요.',
  '已删除 {count} 张图片': '이미지 {count}장을 삭제했습니다',
  '打开设置失败：{error}': '설정을 열 수 없습니다: {error}',
  '添加到角色库失败：{error}': '인물/사물 라이브러리에 추가하지 못했습니다: {error}',
  '尚未取得当前窗口信息，请稍后重试': '창 정보를 아직 가져오지 못했습니다. 잠시 후 다시 시도하세요.',
  '已在独立窗口中打开': '별도 창에서 열었습니다',
  '打开侧边栏失败：{error}': '사이드 패널을 열 수 없습니다: {error}',
  '请先填写 Base URL 和 API Key': '먼저 Base URL과 API Key를 입력하세요',
  '请输入新的模型名称': '새 모델 이름을 입력하세요'
});

Object.assign(EN, {
  '区域截图完成：{width}×{height}': 'Region captured: {width}×{height}',
  '区域截图失败：{error}': 'Region capture failed: {error}',
  '＋ 先添加角色或物品': '+ Add a person or object first',
  '未命名素材': 'Untitled asset',
  '再次点击查看大图': 'Click again to view full size',
  '选择 {name}': 'Select {name}',
  '素材': 'asset',
  '还没有素材，点击上方添加图片。': 'No assets yet. Add an image above.',
  '查看大图': 'View full size',
  '查看素材大图': 'View asset full size',
  '素材名称': 'Asset name',
  '删除': 'Delete',
  '新素材': 'New asset',
  '角色或物品素材': 'Person or object asset',
  '上一张图片的 {count} 张组图已完成并保存到相册': '{count} images for the previous source are complete and saved to the album',
  '上一张图片的组图已中断，已保留 {count} 张': 'The previous image set was interrupted; {count} image(s) were kept',
  '{count} 张主体锚定组图已全部生成，并分别保存到相册；用时 {seconds} 秒。': '{count} identity-anchored images were generated and saved separately in {seconds}s.',
  '{count} 张文生图组图已全部生成，并分别保存到相册；用时 {seconds} 秒。': '{count} text-to-image results were generated and saved separately in {seconds}s.',
  '设置失败': 'Settings failed',
  '网页魔法按钮已恢复': 'The web-page magic button is visible again',
  '已开启；请在普通网页图片上移动鼠标': 'Enabled. Move the pointer over an image on a regular web page.',
  '网页魔法按钮已隐藏': 'The web-page magic button is hidden',
  '确定删除选中的 {count} 张图片吗？此操作不可恢复。': 'Delete the selected {count} image(s)? This cannot be undone.',
  '已在侧边栏开始生成': 'Generation started in the side panel',
  '已发送到侧边栏处理': 'Sent to the side panel',
  '获取失败': 'Fetch failed',
  '获取失败：{error}': 'Fetch failed: {error}'
});

Object.assign(JA, {
  '区域截图完成：{width}×{height}': '範囲をキャプチャしました：{width}×{height}',
  '区域截图失败：{error}': '範囲キャプチャに失敗しました：{error}',
  '＋ 先添加角色或物品': '＋ 人物または物を追加',
  '未命名素材': '名称未設定の素材',
  '再次点击查看大图': 'もう一度クリックして拡大表示',
  '选择 {name}': '{name}を選択',
  '素材': '素材',
  '还没有素材，点击上方添加图片。': '素材がありません。上から画像を追加してください。',
  '查看大图': '拡大表示',
  '查看素材大图': '素材を拡大表示',
  '素材名称': '素材名',
  '删除': '削除',
  '新素材': '新しい素材',
  '角色或物品素材': '人物・物の素材',
  '上一张图片的 {count} 张组图已完成并保存到相册': '前の画像の{count}枚が完了し、アルバムに保存されました',
  '上一张图片的组图已中断，已保留 {count} 张': '前の画像セットが中断され、{count}枚を保持しました',
  '{count} 张主体锚定组图已全部生成，并分别保存到相册；用时 {seconds} 秒。': '主体を固定した{count}枚を生成し、個別に保存しました（{seconds}秒）。',
  '{count} 张文生图组图已全部生成，并分别保存到相册；用时 {seconds} 秒。': 'テキスト生成の{count}枚を個別に保存しました（{seconds}秒）。',
  '设置失败': '設定に失敗しました',
  '网页魔法按钮已恢复': 'Webページのマジックボタンを再表示しました',
  '已开启；请在普通网页图片上移动鼠标': '有効にしました。通常のWebページの画像にポインターを合わせてください。',
  '网页魔法按钮已隐藏': 'Webページのマジックボタンを非表示にしました',
  '确定删除选中的 {count} 张图片吗？此操作不可恢复。': '選択した{count}枚を削除しますか？元に戻せません。',
  '已在侧边栏开始生成': 'サイドパネルで生成を開始しました',
  '已发送到侧边栏处理': 'サイドパネルに送信しました',
  '获取失败': '取得に失敗しました',
  '获取失败：{error}': '取得に失敗しました：{error}'
});

Object.assign(KO, {
  '区域截图完成：{width}×{height}': '영역 캡처 완료: {width}×{height}',
  '区域截图失败：{error}': '영역 캡처 실패: {error}',
  '＋ 先添加角色或物品': '+ 먼저 인물 또는 사물 추가',
  '未命名素材': '이름 없는 소재',
  '再次点击查看大图': '다시 클릭하여 크게 보기',
  '选择 {name}': '{name} 선택',
  '素材': '소재',
  '还没有素材，点击上方添加图片。': '소재가 없습니다. 위에서 이미지를 추가하세요.',
  '查看大图': '크게 보기',
  '查看素材大图': '소재 크게 보기',
  '素材名称': '소재 이름',
  '删除': '삭제',
  '新素材': '새 소재',
  '角色或物品素材': '인물 또는 사물 소재',
  '上一张图片的 {count} 张组图已完成并保存到相册': '이전 원본의 이미지 {count}장이 완료되어 앨범에 저장되었습니다',
  '上一张图片的组图已中断，已保留 {count} 张': '이전 이미지 세트가 중단되어 {count}장을 보관했습니다',
  '{count} 张主体锚定组图已全部生成，并分别保存到相册；用时 {seconds} 秒。': '주체를 고정한 이미지 {count}장을 생성해 각각 저장했습니다. {seconds}초 소요.',
  '{count} 张文生图组图已全部生成，并分别保存到相册；用时 {seconds} 秒。': '텍스트 이미지 {count}장을 생성해 각각 저장했습니다. {seconds}초 소요.',
  '设置失败': '설정 실패',
  '网页魔法按钮已恢复': '웹페이지 매직 버튼을 다시 표시했습니다',
  '已开启；请在普通网页图片上移动鼠标': '활성화했습니다. 일반 웹페이지 이미지 위로 포인터를 이동하세요.',
  '网页魔法按钮已隐藏': '웹페이지 매직 버튼을 숨겼습니다',
  '确定删除选中的 {count} 张图片吗？此操作不可恢复。': '선택한 이미지 {count}장을 삭제할까요? 되돌릴 수 없습니다.',
  '已在侧边栏开始生成': '사이드 패널에서 생성을 시작했습니다',
  '已发送到侧边栏处理': '사이드 패널로 보냈습니다',
  '获取失败': '가져오기 실패',
  '获取失败：{error}': '가져오기 실패: {error}'
});

Object.assign(EN, {
  '自定义平台': 'Custom Platform',
  '自定义（OpenAI 兼容接口）': 'Custom (OpenAI-compatible API)',
  '尚未添加接口': 'No API configured',
  '从右上角选择模板或自定义接口': 'Choose a provider template or Custom API above.',
  '选择内置接口或输入 {url}': 'Choose a built-in API or enter {url}',
  '前往 {platform} 获取 API Key': 'Get an API key from {platform}',
  '前往 {platform} 获取 API Key（推广链接）': 'Get an API key from {platform} (referral link)'
});

Object.assign(JA, {
  '自定义平台': 'カスタムプラットフォーム',
  '自定义（OpenAI 兼容接口）': 'カスタム（OpenAI互換API）',
  '接口，也可以手动添加模型。': 'エンドポイントに対応し、モデルを手動で追加することもできます。',
  '适用于 GPT Image 等支持 Quality 的模型': 'GPT ImageなどQuality設定に対応するモデル向け',
  'Low（默认）': 'Low（デフォルト）',
  '适用于支持 1k / 2k / 4k 的模型': '1K / 2K / 4Kに対応するモデル向け',
  '1K（默认）': '1K（デフォルト）',
  '尚未添加接口': 'APIが設定されていません',
  '从右上角选择模板或自定义接口': '上からサービスのテンプレートまたはカスタムAPIを選択してください。',
  '选择内置接口或输入 {url}': '組み込みAPIを選択するか、{url} を入力',
  '前往 {platform} 获取 API Key': '{platform}でAPIキーを取得',
  '前往 {platform} 获取 API Key（推广链接）': '{platform}でAPIキーを取得（紹介リンク）'
});

Object.assign(KO, {
  '自定义平台': '사용자 지정 플랫폼',
  '自定义（OpenAI 兼容接口）': '사용자 지정(OpenAI 호환 API)',
  '接口，也可以手动添加模型。': '엔드포인트를 지원하며 모델을 직접 추가할 수도 있습니다.',
  '适用于 GPT Image 等支持 Quality 的模型': 'GPT Image 등 Quality 설정을 지원하는 모델용',
  'Low（默认）': 'Low(기본값)',
  '适用于支持 1k / 2k / 4k 的模型': '1K / 2K / 4K를 지원하는 모델용',
  '1K（默认）': '1K(기본값)',
  '尚未添加接口': '설정된 API가 없습니다',
  '从右上角选择模板或自定义接口': '위에서 플랫폼 템플릿 또는 사용자 지정 API를 선택하세요.',
  '选择内置接口或输入 {url}': '기본 제공 API를 선택하거나 {url} 입력',
  '前往 {platform} 获取 API Key': '{platform}에서 API 키 받기',
  '前往 {platform} 获取 API Key（推广链接）': '{platform}에서 API 키 받기(추천 링크)'
});

Object.assign(EN, {
  '④ 配置备份': '④ Configuration Backup',
  '导出或导入平台、模型、比例、语言和其他生成设置，方便重装插件或更换设备。': 'Export or import providers, models, aspect ratios, language, and other generation settings for easy reinstall or device migration.',
  '导出文件包含 API Key，请妥善保管，不要公开分享。': 'The exported file contains API keys. Keep it secure and do not share it publicly.',
  '导出配置': 'Export Settings',
  '导入配置': 'Import Settings',
  '配置已导出，请妥善保管其中的 API Key': 'Settings exported. Keep the included API keys secure.',
  '导入配置将覆盖当前设置，是否继续？': 'Importing will overwrite your current settings. Continue?',
  '配置导入成功': 'Settings imported successfully',
  '导入失败：{error}': 'Import failed: {error}',
  '配置文件格式无效': 'Invalid settings file format',
  '不是 EchoShot · 拍同款配置文件': 'This is not an EchoShot · 拍同款 settings file',
  '配置文件缺少平台或默认模型信息': 'The settings file is missing provider or default model data',
  '配置文件过大': 'The settings file is too large',
  '配置文件不是有效的 JSON': 'The settings file is not valid JSON',
  '全部下载': 'Download All',
  '下载整个相册（共 {count} 张）': 'Download Entire Gallery ({count} images)',
  '正在打包…': 'Packaging…',
  '相册中没有可下载的图片': 'There are no images to download',
  '正在打包第 {current}/{total} 个 ZIP…': 'Packaging ZIP {current} of {total}…',
  '读取相册图片失败': 'Could not read gallery images',
  '相册图片在打包期间发生变化，请重新开始下载': 'Gallery images changed during packaging. Please restart the download.',
  '全部图片已开始下载': 'All image downloads have started',
  '全部下载失败：{error}': 'Download all failed: {error}'
  , '正在准备下载…': 'Preparing download…'
  , '取消下载': 'Cancel Download'
  , '正在打包第 {current}/{total} 张图片…': 'Packaging image {current} of {total}…'
  , '正在准备 {total} 张图片…': 'Preparing {total} images…'
  , '请选择 ZIP 文件的保存位置…': 'Choose where to save the ZIP file…'
  , '已完成 {total} 张图片的打包': 'Finished packaging {total} images'
  , '全部图片已保存到一个 ZIP 文件': 'All images were saved in one ZIP file'
  , '已取消下载': 'Download cancelled'
  , '无法打开保存窗口：{error}': 'Could not open the save dialog: {error}'
  , '正在取消…': 'Cancelling…'
  , '正在取消下载…': 'Cancelling download…'
  , 'ZIP 文件超过 4GB，请减少相册图片后重试': 'The ZIP would exceed 4 GB. Reduce the gallery size and try again.'
  , 'ZIP 文件数量超过 65535 个': 'A ZIP cannot contain more than 65,535 files.'
});

Object.assign(JA, {
  '④ 配置备份': '④ 設定のバックアップ',
  '导出或导入平台、模型、比例、语言和其他生成设置，方便重装插件或更换设备。': 'サービス、モデル、比率、言語などの生成設定をエクスポート／インポートし、再インストールや端末移行に利用できます。',
  '导出文件包含 API Key，请妥善保管，不要公开分享。': 'エクスポートファイルにはAPIキーが含まれます。安全に保管し、公開しないでください。',
  '导出配置': '設定を書き出す',
  '导入配置': '設定を読み込む',
  '配置已导出，请妥善保管其中的 API Key': '設定を書き出しました。含まれるAPIキーを安全に保管してください。',
  '导入配置将覆盖当前设置，是否继续？': '読み込むと現在の設定が上書きされます。続行しますか？',
  '配置导入成功': '設定を読み込みました',
  '导入失败：{error}': '読み込みに失敗しました：{error}',
  '配置文件格式无效': '設定ファイルの形式が正しくありません',
  '不是 EchoShot · 拍同款配置文件': 'EchoShot · 拍同款 の設定ファイルではありません',
  '配置文件缺少平台或默认模型信息': 'サービスまたは既定モデルの情報がありません',
  '配置文件过大': '設定ファイルが大きすぎます',
  '配置文件不是有效的 JSON': '設定ファイルは有効なJSONではありません',
  '全部下载': 'すべてダウンロード',
  '下载整个相册（共 {count} 张）': 'アルバム全体をダウンロード（{count}枚）',
  '正在打包…': 'パッケージ中…',
  '相册中没有可下载的图片': 'ダウンロードできる画像がありません',
  '正在打包第 {current}/{total} 个 ZIP…': 'ZIPをパッケージ中 {current}/{total}…',
  '读取相册图片失败': 'アルバム画像を読み込めませんでした',
  '相册图片在打包期间发生变化，请重新开始下载': 'パッケージ中にアルバム画像が変更されました。ダウンロードをやり直してください。',
  '全部图片已开始下载': 'すべての画像のダウンロードを開始しました',
  '全部下载失败：{error}': '一括ダウンロードに失敗しました：{error}'
  , '正在准备下载…': 'ダウンロードを準備中…'
  , '取消下载': 'ダウンロードを中止'
  , '正在打包第 {current}/{total} 张图片…': '{current}/{total}枚目をパッケージ中…'
  , '正在准备 {total} 张图片…': '{total}枚の画像を準備中…'
  , '请选择 ZIP 文件的保存位置…': 'ZIPファイルの保存先を選択してください…'
  , '已完成 {total} 张图片的打包': '{total}枚のパッケージが完了しました'
  , '全部图片已保存到一个 ZIP 文件': 'すべての画像を1つのZIPファイルに保存しました'
  , '已取消下载': 'ダウンロードを中止しました'
  , '无法打开保存窗口：{error}': '保存画面を開けません：{error}'
  , '正在取消…': '中止しています…'
  , '正在取消下载…': 'ダウンロードを中止しています…'
  , 'ZIP 文件超过 4GB，请减少相册图片后重试': 'ZIPが4GBを超えます。アルバムの画像を減らして再試行してください。'
  , 'ZIP 文件数量超过 65535 个': '1つのZIPに保存できるファイルは65,535個までです。'
});

Object.assign(KO, {
  '④ 配置备份': '④ 설정 백업',
  '导出或导入平台、模型、比例、语言和其他生成设置，方便重装插件或更换设备。': '플랫폼, 모델, 비율, 언어 및 기타 생성 설정을 내보내거나 가져와 재설치와 기기 이전에 사용할 수 있습니다.',
  '导出文件包含 API Key，请妥善保管，不要公开分享。': '내보낸 파일에는 API 키가 포함됩니다. 안전하게 보관하고 공개적으로 공유하지 마세요.',
  '导出配置': '설정 내보내기',
  '导入配置': '설정 가져오기',
  '配置已导出，请妥善保管其中的 API Key': '설정을 내보냈습니다. 포함된 API 키를 안전하게 보관하세요.',
  '导入配置将覆盖当前设置，是否继续？': '가져오면 현재 설정을 덮어씁니다. 계속할까요?',
  '配置导入成功': '설정을 가져왔습니다',
  '导入失败：{error}': '가져오기 실패: {error}',
  '配置文件格式无效': '설정 파일 형식이 올바르지 않습니다',
  '不是 EchoShot · 拍同款配置文件': 'EchoShot · 拍同款 설정 파일이 아닙니다',
  '配置文件缺少平台或默认模型信息': '설정 파일에 플랫폼 또는 기본 모델 정보가 없습니다',
  '配置文件过大': '설정 파일이 너무 큽니다',
  '配置文件不是有效的 JSON': '설정 파일이 올바른 JSON이 아닙니다',
  '全部下载': '모두 다운로드',
  '下载整个相册（共 {count} 张）': '전체 앨범 다운로드({count}장)',
  '正在打包…': '패키징 중…',
  '相册中没有可下载的图片': '다운로드할 이미지가 없습니다',
  '正在打包第 {current}/{total} 个 ZIP…': 'ZIP 패키징 중 {current}/{total}…',
  '读取相册图片失败': '앨범 이미지를 읽지 못했습니다',
  '相册图片在打包期间发生变化，请重新开始下载': '패키징 중 앨범 이미지가 변경되었습니다. 다운로드를 다시 시작해 주세요.',
  '全部图片已开始下载': '모든 이미지 다운로드를 시작했습니다',
  '全部下载失败：{error}': '전체 다운로드 실패: {error}'
  , '正在准备下载…': '다운로드 준비 중…'
  , '取消下载': '다운로드 취소'
  , '正在打包第 {current}/{total} 张图片…': '이미지 패키징 중 {current}/{total}…'
  , '正在准备 {total} 张图片…': '이미지 {total}장 준비 중…'
  , '请选择 ZIP 文件的保存位置…': 'ZIP 파일을 저장할 위치를 선택하세요…'
  , '已完成 {total} 张图片的打包': '이미지 {total}장 패키징 완료'
  , '全部图片已保存到一个 ZIP 文件': '모든 이미지를 하나의 ZIP 파일로 저장했습니다'
  , '已取消下载': '다운로드를 취소했습니다'
  , '无法打开保存窗口：{error}': '저장 창을 열 수 없습니다: {error}'
  , '正在取消…': '취소 중…'
  , '正在取消下载…': '다운로드 취소 중…'
  , 'ZIP 文件超过 4GB，请减少相册图片后重试': 'ZIP 파일이 4GB를 초과합니다. 앨범 이미지를 줄인 후 다시 시도하세요.'
  , 'ZIP 文件数量超过 65535 个': '하나의 ZIP에는 최대 65,535개의 파일을 저장할 수 있습니다.'
});

Object.assign(EN, {
  '正在后台生成 1 个任务，已等待 {seconds} 秒…': '1 image task is running in the background — {seconds}s elapsed…',
  '正在后台生成 {count} 个任务，最长已等待 {seconds} 秒…': '{count} image tasks are running in the background — longest wait {seconds}s…',
  '当前正在执行组图或替换任务，请等待完成': 'An image-set or replacement task is running. Wait for it to finish.',
  '后台生成任务已完成，结果已保存到相册': 'The background image task is complete and saved to the gallery.',
  '生成完成，已保存到相册': 'Generation complete and saved to the gallery.',
  '请求 {requested} · 实际 {actual}': 'Requested {requested} · Actual {actual}',
  '图片已保存，但平台返回 {actual}（请求 {requested}）': 'Image saved, but the provider returned {actual} (requested {requested}).',
  '同时最多运行 4 个单张生图任务，请等待其中一个完成': 'Up to 4 single-image tasks can run at once. Wait for one to finish.',
  '请等待单张生图任务完成后再开始组图或替换任务': 'Wait for the single-image tasks to finish before starting an image set or replacement.'
});

Object.assign(JA, {
  '正在后台生成 1 个任务，已等待 {seconds} 秒…': 'バックグラウンドで1件を生成中 · {seconds}秒経過…',
  '正在后台生成 {count} 个任务，最长已等待 {seconds} 秒…': 'バックグラウンドで{count}件を生成中 · 最長{seconds}秒経過…',
  '当前正在执行组图或替换任务，请等待完成': '画像セットまたは置換タスクの実行中です。完了までお待ちください。',
  '后台生成任务已完成，结果已保存到相册': 'バックグラウンド生成が完了し、アルバムに保存されました。',
  '生成完成，已保存到相册': '生成が完了し、アルバムに保存されました。',
  '请求 {requested} · 实际 {actual}': '指定 {requested} · 実際 {actual}',
  '图片已保存，但平台返回 {actual}（请求 {requested}）': '画像を保存しましたが、サービスから返された比率は {actual} です（指定 {requested}）。',
  '同时最多运行 4 个单张生图任务，请等待其中一个完成': '単画像タスクは同時に4件まで実行できます。いずれかの完了をお待ちください。',
  '请等待单张生图任务完成后再开始组图或替换任务': '単画像タスクの完了後に、画像セットまたは置換タスクを開始してください。'
});

Object.assign(KO, {
  '正在后台生成 1 个任务，已等待 {seconds} 秒…': '백그라운드에서 이미지 작업 1개 생성 중 · {seconds}초 경과…',
  '正在后台生成 {count} 个任务，最长已等待 {seconds} 秒…': '백그라운드에서 이미지 작업 {count}개 생성 중 · 최장 {seconds}초 경과…',
  '当前正在执行组图或替换任务，请等待完成': '이미지 세트 또는 교체 작업이 실행 중입니다. 완료될 때까지 기다려 주세요.',
  '后台生成任务已完成，结果已保存到相册': '백그라운드 생성이 완료되어 앨범에 저장되었습니다.',
  '生成完成，已保存到相册': '생성이 완료되어 앨범에 저장되었습니다.',
  '请求 {requested} · 实际 {actual}': '요청 {requested} · 실제 {actual}',
  '图片已保存，但平台返回 {actual}（请求 {requested}）': '이미지는 저장되었지만 플랫폼이 {actual} 비율로 반환했습니다(요청 {requested}).',
  '同时最多运行 4 个单张生图任务，请等待其中一个完成': '단일 이미지 작업은 동시에 최대 4개까지 실행할 수 있습니다. 하나가 완료될 때까지 기다려 주세요.',
  '请等待单张生图任务完成后再开始组图或替换任务': '단일 이미지 작업이 완료된 후 이미지 세트 또는 교체 작업을 시작하세요.'
});

Object.assign(EN, {
  '模型别名（可选）': 'Model alias (optional)',
  '为 {model} 设置别名': 'Set an alias for {model}',
  '模型名称、别名与启用能力': 'Models, Aliases & Capabilities'
});
Object.assign(JA, {
  '模型别名（可选）': 'モデルの別名（任意）',
  '为 {model} 设置别名': '{model} の別名を設定',
  '模型名称、别名与启用能力': 'モデル・別名・機能'
});
Object.assign(KO, {
  '模型别名（可选）': '모델 별칭(선택 사항)',
  '为 {model} 设置别名': '{model}의 별칭 설정',
  '模型名称、别名与启用能力': '모델, 별칭 및 기능'
});

Object.assign(EN, {
  '拖放图片到这里': 'Drop the image here',
  '先读取提示词；没有时再调用反推模型': 'Read the embedded prompt first; analyze only if none is found',
  '也可以把本地图片拖入侧边栏；有兼容的生成提示词时直接读取，没有时再进行反推。': 'You can also drag a local image into the side panel. A compatible embedded generation prompt is read locally; otherwise the image is analyzed.',
  '当你点击反推、拖入不含可识别生成提示词的图片、生成、角色替换或组图生成时，所选来源图、参考素材和提示词会发送到你选择的 AI 平台，用于完成本次任务。': 'When you reverse, drop an image without a recognized generation prompt, generate, replace a subject, or create a set, the required images, references, and prompts are sent to your chosen AI provider for that task.',
  '✓ 已读取图片中的提示词，可直接编辑': '✓ Embedded prompt read — you can edit it',
  '正在读取图片元数据…': 'Reading image metadata…',
  '请先同意数据使用方式': 'Agree to the data handling terms first',
  '来自拖入的本地图片': 'Local image dropped into the side panel',
  '已读取图片中的提示词': 'Embedded prompt read from image',
  '已从 {source} 元数据读取提示词': 'Prompt read from {source} metadata',
  '元数据': 'Metadata',
  '元数据：{source}': 'Metadata: {source}',
  '图片没有可识别的生成提示词，正在反推': 'No recognized generation prompt found; analyzing the image',
  '只支持拖入图片文件': 'Only image files can be dropped here',
  '图片读取失败：{error}': 'Could not read image: {error}',
  '当前图片格式不支持嵌入生成信息': 'This image format does not support embedded generation metadata',
  '下载失败：{error}': 'Download failed: {error}',
  '原模型当前未启用，将使用当前生图模型重新生成': 'The original model is not enabled. Regenerating with the current image model.',
  '更新日期：2026 年 10 月 23 日': 'Updated: October 23, 2026',
  '只有当用户点击反推、主动将不含可识别生成提示词的图片拖入侧边栏、生成、替换角色或组图生成时，扩展才会将完成任务所必需的来源图、参考素材和提示词发送到用户选定的 AI 平台。读取图片内嵌的兼容生成提示词只在本机完成，不会因此发送图片。': 'Only when the user starts prompt analysis, drops an image without a recognized generation prompt into the side panel, generates, replaces a subject, or creates an image set does the extension send the data required for that task to the selected AI provider. Reading compatible embedded generation prompts happens locally and does not send the image.'
});
Object.assign(JA, {
  '拖放图片到这里': 'ここに画像をドロップ',
  '先读取提示词；没有时再调用反推模型': '埋め込みプロンプトを先に読み、ない場合のみ解析します',
  '也可以把本地图片拖入侧边栏；有兼容的生成提示词时直接读取，没有时再进行反推。': 'ローカル画像をサイドパネルにドロップできます。互換性のある生成プロンプトがあればローカルで読み取り、なければ画像を解析します。',
  '当你点击反推、拖入不含可识别生成提示词的图片、生成、角色替换或组图生成时，所选来源图、参考素材和提示词会发送到你选择的 AI 平台，用于完成本次任务。': '解析、認識可能な生成プロンプトのない画像のドロップ、生成、置換、画像セット作成を実行すると、必要な画像・参照素材・プロンプトが選択したAIサービスへ送信されます。',
  '✓ 已读取图片中的提示词，可直接编辑': '✓ 埋め込みプロンプトを読み取りました・編集できます',
  '正在读取图片元数据…': '画像メタデータを読み取り中…',
  '请先同意数据使用方式': '先にデータの利用方法へ同意してください',
  '来自拖入的本地图片': 'ドロップしたローカル画像',
  '已读取图片中的提示词': '画像内のプロンプトを読み取りました',
  '已从 {source} 元数据读取提示词': '{source}メタデータからプロンプトを読み取りました',
  '元数据': 'メタデータ',
  '元数据：{source}': 'メタデータ：{source}',
  '图片没有可识别的生成提示词，正在反推': '認識可能な生成プロンプトがないため画像を解析しています',
  '只支持拖入图片文件': '画像ファイルのみドロップできます',
  '图片读取失败：{error}': '画像を読み取れません：{error}',
  '当前图片格式不支持嵌入生成信息': 'この画像形式は生成情報の埋め込みに対応していません',
  '下载失败：{error}': 'ダウンロードに失敗しました：{error}',
  '在相册中查看这张生成图片的大图': 'この生成画像をアルバムで拡大表示',
  '原模型当前未启用，将使用当前生图模型重新生成': '元のモデルが有効でないため、現在の画像モデルで再生成します',
  '更新日期：2026 年 10 月 23 日': '更新日：2026年10月23日',
  '只有当用户点击反推、主动将不含可识别生成提示词的图片拖入侧边栏、生成、替换角色或组图生成时，扩展才会将完成任务所必需的来源图、参考素材和提示词发送到用户选定的 AI 平台。读取图片内嵌的兼容生成提示词只在本机完成，不会因此发送图片。': '解析、認識可能な生成プロンプトのない画像のドロップ、生成、置換、画像セット作成を実行した場合のみ、必要なデータを選択したAIサービスへ送信します。互換性のある埋め込み生成プロンプトの読み取りはローカルで完結し、画像は送信されません。'
});
Object.assign(KO, {
  '拖放图片到这里': '여기에 이미지를 놓으세요',
  '先读取提示词；没有时再调用反推模型': '내장 프롬프트를 먼저 읽고, 없을 때만 분석합니다',
  '也可以把本地图片拖入侧边栏；有兼容的生成提示词时直接读取，没有时再进行反推。': '로컬 이미지를 사이드 패널로 끌어올 수 있습니다. 호환되는 생성 프롬프트가 있으면 로컬에서 읽고, 없으면 이미지를 분석합니다.',
  '当你点击反推、拖入不含可识别生成提示词的图片、生成、角色替换或组图生成时，所选来源图、参考素材和提示词会发送到你选择的 AI 平台，用于完成本次任务。': '분석, 인식 가능한 생성 프롬프트가 없는 이미지 드롭, 생성, 교체 또는 이미지 세트 작업을 실행하면 필요한 이미지, 참고 소재 및 프롬프트가 선택한 AI 플랫폼으로 전송됩니다.',
  '✓ 已读取图片中的提示词，可直接编辑': '✓ 내장 프롬프트를 읽었습니다 · 편집할 수 있습니다',
  '正在读取图片元数据…': '이미지 메타데이터 읽는 중…',
  '请先同意数据使用方式': '먼저 데이터 처리 방식에 동의하세요',
  '来自拖入的本地图片': '사이드 패널로 끌어온 로컬 이미지',
  '已读取图片中的提示词': '이미지에서 내장 프롬프트를 읽었습니다',
  '已从 {source} 元数据读取提示词': '{source} 메타데이터에서 프롬프트를 읽었습니다',
  '元数据': '메타데이터',
  '元数据：{source}': '메타데이터: {source}',
  '图片没有可识别的生成提示词，正在反推': '인식 가능한 생성 프롬프트가 없어 이미지를 분석합니다',
  '只支持拖入图片文件': '이미지 파일만 놓을 수 있습니다',
  '图片读取失败：{error}': '이미지를 읽지 못했습니다: {error}',
  '当前图片格式不支持嵌入生成信息': '이 이미지 형식은 생성 정보 내장을 지원하지 않습니다',
  '下载失败：{error}': '다운로드 실패: {error}',
  '在相册中查看这张生成图片的大图': '이 생성 이미지를 앨범에서 크게 보기',
  '原模型当前未启用，将使用当前生图模型重新生成': '원래 모델이 활성화되어 있지 않아 현재 이미지 모델로 다시 생성합니다',
  '更新日期：2026 年 10 月 23 日': '업데이트: 2026년 10월 23일',
  '只有当用户点击反推、主动将不含可识别生成提示词的图片拖入侧边栏、生成、替换角色或组图生成时，扩展才会将完成任务所必需的来源图、参考素材和提示词发送到用户选定的 AI 平台。读取图片内嵌的兼容生成提示词只在本机完成，不会因此发送图片。': '분석, 인식 가능한 생성 프롬프트가 없는 이미지 드롭, 생성, 교체 또는 이미지 세트 작업을 시작할 때만 필요한 데이터를 선택한 AI 플랫폼으로 전송합니다. 호환되는 내장 생성 프롬프트 읽기는 로컬에서만 처리되며 이미지를 전송하지 않습니다.'
});

Object.assign(EN, {
  '像素尺寸用于 OpenAI 兼容接口及需要宽高的模型；其他平台会按所选比例和分辨率档位转换为各自支持的请求参数。': 'Pixel sizes are used by OpenAI-compatible APIs and models that require width and height. Other providers convert the selected ratio and resolution tier to their own request parameters.',
  '最终像素尺寸由所选平台和模型决定，可能与上方映射值不同；已知不支持的参数不会发送。': 'Final pixel dimensions depend on the selected provider and model and may differ from the mapping above. Parameters known to be unsupported are not sent.',
  '请选择有效的图片文件': 'Choose a valid image file',
  '素材图片不能超过 32 MiB': 'Reference images cannot exceed 32 MiB',
  '添加素材失败：{error}': 'Could not add the reference image: {error}',
  '复制失败：{error}': 'Copy failed: {error}'
  , '参考尺寸': 'Reference size'
});
Object.assign(JA, {
  '像素尺寸用于 OpenAI 兼容接口及需要宽高的模型；其他平台会按所选比例和分辨率档位转换为各自支持的请求参数。': 'ピクセルサイズは OpenAI 互換 API と幅・高さを必要とするモデルで使用されます。その他のプラットフォームでは、選択した比率と解像度を各 API の形式に変換します。',
  '最终像素尺寸由所选平台和模型决定，可能与上方映射值不同；已知不支持的参数不会发送。': '最終的なピクセルサイズはプラットフォームとモデルによって決まり、上記の値と異なる場合があります。非対応と判明しているパラメータは送信しません。',
  '请选择有效的图片文件': '有効な画像ファイルを選択してください',
  '素材图片不能超过 32 MiB': '参照画像は 32 MiB 以下にしてください',
  '添加素材失败：{error}': '素材を追加できませんでした：{error}',
  '复制失败：{error}': 'コピーに失敗しました：{error}'
  , '参考尺寸': '参考サイズ'
});
Object.assign(KO, {
  '像素尺寸用于 OpenAI 兼容接口及需要宽高的模型；其他平台会按所选比例和分辨率档位转换为各自支持的请求参数。': '픽셀 크기는 OpenAI 호환 API와 너비·높이가 필요한 모델에 사용됩니다. 다른 플랫폼은 선택한 비율과 해상도를 각 API 형식으로 변환합니다.',
  '最终像素尺寸由所选平台和模型决定，可能与上方映射值不同；已知不支持的参数不会发送。': '최종 픽셀 크기는 플랫폼과 모델에 따라 달라지며 위 값과 다를 수 있습니다. 지원하지 않는 것으로 확인된 매개변수는 전송하지 않습니다.',
  '请选择有效的图片文件': '유효한 이미지 파일을 선택하세요',
  '素材图片不能超过 32 MiB': '참고 이미지는 32 MiB를 초과할 수 없습니다',
  '添加素材失败：{error}': '소재를 추가하지 못했습니다: {error}',
  '复制失败：{error}': '복사 실패: {error}'
  , '参考尺寸': '참고 크기'
});

Object.assign(EN, {
  '⑤ 图片本地备份': '⑤ Local image backup',
  '生成图片保存到相册后，自动在所选目录的 EchoShot-backup 文件夹内备份成图、原图、角色与物品库及恢复清单。成图包含与相册下载一致的内嵌元数据，文件使用 SHA-256 校验。删除相册作品不会删除本地备份。': 'After generated images are saved to the album, automatically back up results, source images, the character library, and recovery manifests in EchoShot-backup. Generated images contain the same embedded metadata as album downloads and are protected by SHA-256 checksums. Deleting album items does not delete backups.',
  '自动备份': 'Automatic backup',
  '尚未选择目录': 'No folder selected',
  '选择 / 重新授权目录': 'Choose / reauthorize folder',
  '补备份现有相册': 'Back up existing library',
  '停止补备份': 'Stop backup',
  '停止校验': 'Stop verification',
  '停止恢复': 'Stop restoration',
  '校验备份完整性': 'Verify backup integrity',
  '从备份恢复相册': 'Restore from backup',
  '诊断容量和目录权限': 'Diagnose capacity and permissions',
  '未完成项目保存在持久队列中，浏览器重启后会自动补齐；若系统收回目录授权，请重新授权。恢复不会覆盖相同 ID 的已有记录。目录授权不随配置导出。': 'Unfinished items remain in a persistent queue and resume after browser restart. Reauthorize the folder if the system revokes access. Restore never overwrites records with the same ID. Folder access is not included in settings exports.',
  '保存目录：{directory} / EchoShot-backup': 'Backup folder: {directory} / EchoShot-backup',
  '备份状态：成功 {success}，失败 {failed}，待处理 {pending}（相册 {images}，角色库 {characters}）': 'Backup status: {success} succeeded, {failed} failed, {pending} pending (album {images}, library {characters})',
  '浏览器相册存储：{usage}{quota}；{protection}': 'Browser album storage: {usage}{quota}; {protection}',
  '已启用持久存储保护': 'persistent storage protection enabled',
  '由浏览器管理存储保护': 'storage protection managed by the browser',
  '请先选择备份目录': 'Choose a backup folder first',
  '请重新选择并授权备份目录': 'Choose and authorize the backup folder again',
  '请先启用自动备份并选择目录': 'Enable automatic backup and choose a folder first',
  '正在备份：{completed} / {total}，失败 {failures}': 'Backing up: {completed} / {total}, failed {failures}',
  '已停止；已备份 {images} 张图片、{characters} 项角色素材，失败 {failed}': 'Stopped; backed up {images} images and {characters} library items; {failed} failed',
  '备份完成；图片 {images} 张、角色素材 {characters} 项、失败 {failed}': 'Backup complete: {images} images, {characters} library items, {failed} failed',
  '备份未完成：{error}': 'Backup incomplete: {error}',
  '备份进行中，浏览器重启后会自动补齐': 'Backup in progress; it will resume after browser restart',
  '最近一项{subject}已备份': 'The latest {subject} was backed up',
  '备份失败：{error}': 'Backup failed: {error}',
  '自动补备份完成，共 {images} 张图片、{characters} 项角色素材': 'Automatic backup complete: {images} images and {characters} library items',
  '备份目录已切换，请重新执行备份': 'The backup folder changed; run the backup again',
  '关联原图不存在或无法读取，已保留待处理状态': 'The linked source image is missing or unreadable; it remains pending',
  '新版备份缺少完整性信息': 'The new backup is missing integrity information',
  '图片': 'image', '角色素材': 'character asset',
  '自动备份已启用，现有内容已加入持久备份队列。': 'Automatic backup is enabled. Existing content was added to the persistent queue.',
  '目录设置失败：{error}': 'Folder setup failed: {error}',
  '自动备份已启用': 'Automatic backup enabled',
  '自动备份已暂停，已有文件保留': 'Automatic backup paused; existing files are retained',
  '正在校验：{completed} / {total}': 'Verifying: {completed} / {total}',
  '校验完成：通过 {valid}，损坏或缺失 {failed}，旧版未校验 {unverified}': 'Verification complete: {valid} valid, {failed} damaged or missing, {unverified} legacy unverified',
  '校验失败：{error}': 'Verification failed: {error}',
  '将从备份恢复缺失的相册和角色库记录，不覆盖现有记录。是否继续？': 'Restore missing album and library records without overwriting existing records?',
  '正在恢复：{completed} / {total}': 'Restoring: {completed} / {total}',
  '恢复完成：相册 {images}，角色库 {characters}，已存在 {skipped}，失败 {failed}': 'Restore complete: album {images}, library {characters}, existing {skipped}, failed {failed}',
  '恢复失败：{error}': 'Restore failed: {error}',
  '未知': 'Unknown',
  '目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器预计剩余：{remaining}': 'Folder permission: {permission}; read: {readable}; write: {writable}; estimated browser space remaining: {remaining}',
  '目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器相册预计剩余：{remaining}。所选磁盘剩余容量请在系统中查看。': 'Folder permission: {permission}; read: {readable}; write: {writable}; estimated browser album space remaining: {remaining}. Check the selected disk’s free space in the operating system.',
  '已授权': 'Granted', '未授权': 'Not granted', '正常': 'OK', '失败': 'Failed',
  '存储与目录诊断完成': 'Storage and folder diagnostics complete',
  '目录不可写，请重新授权或更换目录': 'The folder is not writable; reauthorize it or choose another folder',
  '诊断失败：{error}': 'Diagnostics failed: {error}',
  '当前浏览器不支持目录授权，请使用相册下载功能备份。': 'This browser does not support folder access. Use album downloads for backup.',
  '备份目录需要重新授权，请点击“选择 / 重新授权目录”。': 'The backup folder needs authorization. Click “Choose / reauthorize folder”.',
  '备份设置读取失败：{error}': 'Could not read backup settings: {error}'
  , '可选的本地备份会在用户授权的目录中保存生成图片、相关原图、角色/物品素材及恢复清单；生成图片保留与相册下载一致的内嵌元数据，清单包含 SHA-256 完整性信息，但不导出 API Key。用户可在设置中校验备份并恢复缺失记录。目录授权仅保存在本机，不包含在配置导出中。删除相册作品或卸载扩展不会删除这些独立备份文件；请在文件管理器中管理它们。': 'Optional local backup stores generated images, related source images, character/item assets, and recovery manifests in a user-authorized folder. Generated images retain the same embedded metadata as album downloads, and manifests include SHA-256 integrity data. API keys are never exported. Users can verify backups and restore missing records. Folder authorization remains local and is excluded from settings exports. Deleting album items or uninstalling the extension does not remove these independent backup files.'
});

Object.assign(JA, {
  '⑤ 图片本地备份': '⑤ 画像のローカルバックアップ',
  '生成图片保存到相册后，自动在所选目录的 EchoShot-backup 文件夹内备份成图、原图、角色与物品库及恢复清单。成图包含与相册下载一致的内嵌元数据，文件使用 SHA-256 校验。删除相册作品不会删除本地备份。': '生成画像をアルバムに保存すると、完成画像、元画像、キャラクター・アイテムライブラリ、復元用マニフェストを EchoShot-backup に自動保存します。完成画像にはアルバムのダウンロードと同じメタデータが埋め込まれ、SHA-256 で検証されます。',
  '自动备份': '自動バックアップ', '尚未选择目录': 'フォルダ未選択',
  '选择 / 重新授权目录': 'フォルダを選択・再認証', '补备份现有相册': '既存アルバムをバックアップ',
  '停止补备份': 'バックアップを停止', '校验备份完整性': 'バックアップを検証',
  '停止校验': '検証を停止', '停止恢复': '復元を停止',
  '从备份恢复相册': 'バックアップから復元', '诊断容量和目录权限': '容量と権限を診断',
  '未完成项目保存在持久队列中，浏览器重启后会自动补齐；若系统收回目录授权，请重新授权。恢复不会覆盖相同 ID 的已有记录。目录授权不随配置导出。': '未完了項目は永続キューに残り、ブラウザー再起動後に再開します。権限が失われた場合は再認証してください。同じ ID の既存レコードは上書きしません。',
  '保存目录：{directory} / EchoShot-backup': '保存先：{directory} / EchoShot-backup',
  '备份状态：成功 {success}，失败 {failed}，待处理 {pending}（相册 {images}，角色库 {characters}）': '状態：成功 {success}、失敗 {failed}、保留 {pending}（アルバム {images}、ライブラリ {characters}）',
  '浏览器相册存储：{usage}{quota}；{protection}': 'ブラウザー保存容量：{usage}{quota}、{protection}',
  '已启用持久存储保护': '永続ストレージ保護が有効', '由浏览器管理存储保护': 'ブラウザーがストレージ保護を管理',
  '请先选择备份目录': '先にバックアップフォルダを選択してください', '请重新选择并授权备份目录': 'バックアップフォルダを再選択して認証してください',
  '请先启用自动备份并选择目录': '自動バックアップを有効にしてフォルダを選択してください',
  '正在备份：{completed} / {total}，失败 {failures}': 'バックアップ中：{completed} / {total}、失敗 {failures}',
  '已停止；已备份 {images} 张图片、{characters} 项角色素材，失败 {failed}': '停止しました。画像 {images}、素材 {characters}、失敗 {failed}',
  '备份完成；图片 {images} 张、角色素材 {characters} 项、失败 {failed}': '完了：画像 {images}、素材 {characters}、失敗 {failed}',
  '备份未完成：{error}': 'バックアップ未完了：{error}',
  '备份进行中，浏览器重启后会自动补齐': 'バックアップ中です。ブラウザー再起動後に再開します',
  '最近一项{subject}已备份': '最新の{subject}をバックアップしました',
  '备份失败：{error}': 'バックアップ失敗：{error}',
  '自动补备份完成，共 {images} 张图片、{characters} 项角色素材': '自動補完了：画像 {images}、ライブラリ {characters}',
  '备份目录已切换，请重新执行备份': 'バックアップ先が変わりました。もう一度実行してください',
  '关联原图不存在或无法读取，已保留待处理状态': '関連する元画像がないか読み取れません。保留として処理します',
  '新版备份缺少完整性信息': '新しいバックアップに完全性情報がありません',
  '图片': '画像', '角色素材': '素材',
  '自动备份已启用，现有内容已加入持久备份队列。': '自動バックアップを有効にし、既存データを永続キューに追加しました。',
  '目录设置失败：{error}': 'フォルダ設定に失敗しました：{error}', '自动备份已启用': '自動バックアップが有効です',
  '自动备份已暂停，已有文件保留': '自動バックアップを一時停止しました。既存ファイルは保持されます。',
  '正在校验：{completed} / {total}': '検証中：{completed} / {total}',
  '校验完成：通过 {valid}，损坏或缺失 {failed}，旧版未校验 {unverified}': '検証完了：正常 {valid}、破損・欠落 {failed}、旧形式未検証 {unverified}',
  '校验失败：{error}': '検証失敗：{error}',
  '将从备份恢复缺失的相册和角色库记录，不覆盖现有记录。是否继续？': '不足しているアルバムとライブラリを復元します。既存データは上書きしません。続行しますか？',
  '正在恢复：{completed} / {total}': '復元中：{completed} / {total}',
  '恢复完成：相册 {images}，角色库 {characters}，已存在 {skipped}，失败 {failed}': '復元完了：アルバム {images}、ライブラリ {characters}、既存 {skipped}、失敗 {failed}',
  '恢复失败：{error}': '復元失敗：{error}', '未知': '不明',
  '目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器预计剩余：{remaining}': 'フォルダ権限：{permission}、読込：{readable}、書込：{writable}、ブラウザー推定残量：{remaining}',
  '目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器相册预计剩余：{remaining}。所选磁盘剩余容量请在系统中查看。': 'フォルダ権限：{permission}、読込：{readable}、書込：{writable}、ブラウザーアルバム推定残量：{remaining}。選択したディスクの空き容量はシステムで確認してください。',
  '已授权': '許可済み', '未授权': '未許可', '正常': '正常', '失败': '失敗',
  '存储与目录诊断完成': 'ストレージとフォルダの診断が完了しました',
  '目录不可写，请重新授权或更换目录': 'フォルダに書き込めません。再認証または変更してください',
  '诊断失败：{error}': '診断失敗：{error}',
  '当前浏览器不支持目录授权，请使用相册下载功能备份。': 'このブラウザーはフォルダ認証に対応していません。アルバムのダウンロードを使用してください。',
  '备份目录需要重新授权，请点击“选择 / 重新授权目录”。': 'バックアップフォルダの再認証が必要です。選択・再認証をクリックしてください。',
  '备份设置读取失败：{error}': 'バックアップ設定を読み込めません：{error}'
  , '可选的本地备份会在用户授权的目录中保存生成图片、相关原图、角色/物品素材及恢复清单；生成图片保留与相册下载一致的内嵌元数据，清单包含 SHA-256 完整性信息，但不导出 API Key。用户可在设置中校验备份并恢复缺失记录。目录授权仅保存在本机，不包含在配置导出中。删除相册作品或卸载扩展不会删除这些独立备份文件；请在文件管理器中管理它们。': '任意のローカルバックアップは、生成画像、関連する元画像、キャラクター・アイテム素材、復元マニフェストをユーザーが許可したフォルダに保存します。生成画像にはアルバムのダウンロードと同じメタデータが埋め込まれ、マニフェストには SHA-256 完全性情報が含まれます。API Key は書き出しません。設定から検証と不足レコードの復元ができます。フォルダ権限は端末内だけに保存され、設定の書き出しには含まれません。'
});

Object.assign(KO, {
  '⑤ 图片本地备份': '⑤ 이미지 로컬 백업',
  '生成图片保存到相册后，自动在所选目录的 EchoShot-backup 文件夹内备份成图、原图、角色与物品库及恢复清单。成图包含与相册下载一致的内嵌元数据，文件使用 SHA-256 校验。删除相册作品不会删除本地备份。': '생성 이미지를 앨범에 저장하면 결과 이미지, 원본, 캐릭터·소품 라이브러리와 복구 목록을 EchoShot-backup에 자동 백업합니다. 결과 이미지에는 앨범 다운로드와 같은 메타데이터가 포함되며 SHA-256으로 검증됩니다.',
  '自动备份': '자동 백업', '尚未选择目录': '폴더를 선택하지 않음',
  '选择 / 重新授权目录': '폴더 선택 / 재승인', '补备份现有相册': '기존 앨범 백업',
  '停止补备份': '백업 중지', '校验备份完整性': '백업 무결성 확인',
  '停止校验': '검증 중지', '停止恢复': '복원 중지',
  '从备份恢复相册': '백업에서 복원', '诊断容量和目录权限': '용량 및 권한 진단',
  '未完成项目保存在持久队列中，浏览器重启后会自动补齐；若系统收回目录授权，请重新授权。恢复不会覆盖相同 ID 的已有记录。目录授权不随配置导出。': '완료되지 않은 항목은 영구 대기열에 남아 브라우저 재시작 후 재개됩니다. 권한이 해제되면 다시 승인하세요. 같은 ID의 기존 항목은 덮어쓰지 않습니다.',
  '保存目录：{directory} / EchoShot-backup': '저장 폴더: {directory} / EchoShot-backup',
  '备份状态：成功 {success}，失败 {failed}，待处理 {pending}（相册 {images}，角色库 {characters}）': '백업 상태: 성공 {success}, 실패 {failed}, 대기 {pending} (앨범 {images}, 라이브러리 {characters})',
  '浏览器相册存储：{usage}{quota}；{protection}': '브라우저 앨범 저장공간: {usage}{quota}; {protection}',
  '已启用持久存储保护': '영구 저장소 보호 사용', '由浏览器管理存储保护': '브라우저가 저장소 보호 관리',
  '请先选择备份目录': '먼저 백업 폴더를 선택하세요', '请重新选择并授权备份目录': '백업 폴더를 다시 선택하고 승인하세요',
  '请先启用自动备份并选择目录': '자동 백업을 켜고 폴더를 선택하세요',
  '正在备份：{completed} / {total}，失败 {failures}': '백업 중: {completed} / {total}, 실패 {failures}',
  '已停止；已备份 {images} 张图片、{characters} 项角色素材，失败 {failed}': '중지됨: 이미지 {images}, 소재 {characters}, 실패 {failed}',
  '备份完成；图片 {images} 张、角色素材 {characters} 项、失败 {failed}': '백업 완료: 이미지 {images}, 소재 {characters}, 실패 {failed}',
  '备份未完成：{error}': '백업 미완료: {error}',
  '备份进行中，浏览器重启后会自动补齐': '백업 중입니다. 브라우저를 다시 시작하면 재개됩니다',
  '最近一项{subject}已备份': '최근 {subject} 백업 완료',
  '备份失败：{error}': '백업 실패: {error}',
  '自动补备份完成，共 {images} 张图片、{characters} 项角色素材': '자동 백업 완료: 이미지 {images}, 라이브러리 {characters}',
  '备份目录已切换，请重新执行备份': '백업 폴더가 변경되었습니다. 다시 실행하세요',
  '关联原图不存在或无法读取，已保留待处理状态': '연결된 원본 이미지를 찾거나 읽을 수 없어 대기 상태로 남겼습니다',
  '新版备份缺少完整性信息': '새 백업에 무결성 정보가 없습니다',
  '图片': '이미지', '角色素材': '소재',
  '自动备份已启用，现有内容已加入持久备份队列。': '자동 백업을 켰으며 기존 항목을 영구 대기열에 추가했습니다.',
  '目录设置失败：{error}': '폴더 설정 실패: {error}', '自动备份已启用': '자동 백업 사용',
  '自动备份已暂停，已有文件保留': '자동 백업 일시 중지, 기존 파일 유지',
  '正在校验：{completed} / {total}': '검증 중: {completed} / {total}',
  '校验完成：通过 {valid}，损坏或缺失 {failed}，旧版未校验 {unverified}': '검증 완료: 정상 {valid}, 손상·누락 {failed}, 구버전 미검증 {unverified}',
  '校验失败：{error}': '검증 실패: {error}',
  '将从备份恢复缺失的相册和角色库记录，不覆盖现有记录。是否继续？': '누락된 앨범과 라이브러리를 복원합니다. 기존 항목은 덮어쓰지 않습니다. 계속할까요?',
  '正在恢复：{completed} / {total}': '복원 중: {completed} / {total}',
  '恢复完成：相册 {images}，角色库 {characters}，已存在 {skipped}，失败 {failed}': '복원 완료: 앨범 {images}, 라이브러리 {characters}, 기존 {skipped}, 실패 {failed}',
  '恢复失败：{error}': '복원 실패: {error}', '未知': '알 수 없음',
  '目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器预计剩余：{remaining}': '폴더 권한: {permission}; 읽기: {readable}; 쓰기: {writable}; 브라우저 예상 잔여: {remaining}',
  '目录权限：{permission}；读取：{readable}；写入：{writable}；浏览器相册预计剩余：{remaining}。所选磁盘剩余容量请在系统中查看。': '폴더 권한: {permission}; 읽기: {readable}; 쓰기: {writable}; 브라우저 앨범 예상 잔여: {remaining}. 선택한 디스크의 여유 공간은 시스템에서 확인하세요.',
  '已授权': '승인됨', '未授权': '승인 안 됨', '正常': '정상', '失败': '실패',
  '存储与目录诊断完成': '저장공간 및 폴더 진단 완료',
  '目录不可写，请重新授权或更换目录': '폴더에 쓸 수 없습니다. 다시 승인하거나 다른 폴더를 선택하세요',
  '诊断失败：{error}': '진단 실패: {error}',
  '当前浏览器不支持目录授权，请使用相册下载功能备份。': '이 브라우저는 폴더 접근을 지원하지 않습니다. 앨범 다운로드를 사용하세요.',
  '备份目录需要重新授权，请点击“选择 / 重新授权目录”。': '백업 폴더를 다시 승인해야 합니다. 폴더 선택 / 재승인을 누르세요.',
  '备份设置读取失败：{error}': '백업 설정 읽기 실패: {error}'
  , '可选的本地备份会在用户授权的目录中保存生成图片、相关原图、角色/物品素材及恢复清单；生成图片保留与相册下载一致的内嵌元数据，清单包含 SHA-256 完整性信息，但不导出 API Key。用户可在设置中校验备份并恢复缺失记录。目录授权仅保存在本机，不包含在配置导出中。删除相册作品或卸载扩展不会删除这些独立备份文件；请在文件管理器中管理它们。': '선택적 로컬 백업은 생성 이미지, 관련 원본, 캐릭터·소품 소재와 복구 목록을 사용자가 승인한 폴더에 저장합니다. 생성 이미지는 앨범 다운로드와 동일한 내장 메타데이터를 유지하고 목록에는 SHA-256 무결성 정보가 포함됩니다. API Key는 내보내지 않습니다. 설정에서 백업을 검증하고 누락 항목을 복원할 수 있습니다. 폴더 권한은 이 기기에만 저장되며 설정 내보내기에 포함되지 않습니다.'
});

Object.assign(EN, { 'RunningHUB 国内站': 'RunningHUB China' });
Object.assign(JA, { 'RunningHUB 国内站': 'RunningHUB 中国サイト' });
Object.assign(KO, { 'RunningHUB 国内站': 'RunningHUB 중국 사이트' });
Object.assign(EN, { '获取名称': 'Fetch name' });
Object.assign(JA, { '获取名称': '名前を取得' });
Object.assign(KO, { '获取名称': '이름 가져오기' });
Object.assign(EN, { '已填入内置工作流名称': 'Built-in workflow name filled in' });
Object.assign(JA, { '已填入内置工作流名称': '内蔵のワークフロー名を入力しました' });
Object.assign(KO, { '已填入内置工作流名称': '내장 워크플로 이름을 입력했습니다' });
const DICTIONARIES = { zh: {}, en: EN, ja: JA, ko: KO };
Object.assign(EN, { '旧版未校验：{count}': 'Legacy unverified: {count}' });
Object.assign(JA, { '旧版未校验：{count}': '旧形式・未検証：{count}' });
Object.assign(KO, { '旧版未校验：{count}': '구버전 미검증: {count}' });

// Optional-source recovery and model-selection audit fixes.
for (const [key, translations] of Object.entries({
  '设置保存冲突：其他页面已修改同一配置，请重新打开设置核对后重试': ['Settings conflict: another page changed the same setting. Reopen settings, review the changes, and try again.', '設定の保存が競合しました。別のページで同じ設定が変更されています。設定を開き直して確認し、再試行してください。', '설정 저장 충돌: 다른 페이지에서 같은 설정을 변경했습니다. 설정을 다시 열어 확인한 후 재시도하세요.'],
  '页面已切换，请返回来源页面重新框选': ['The page changed. Return to the source page and select an area again.', 'ページが切り替わりました。元のページに戻って範囲を選び直してください。', '페이지가 변경되었습니다. 원본 페이지로 돌아가 영역을 다시 선택하세요.'],
  'fal.ai 模型目录请求过于频繁，请稍后重试': ['The fal.ai model catalog is rate limited. Try again later.', 'fal.aiのモデル一覧へのリクエストが制限されています。しばらくしてから再試行してください。', 'fal.ai 모델 목록 요청이 제한되었습니다. 잠시 후 다시 시도하세요.'],
  '开始恢复': ['Start restore', '復元を開始', '복원 시작'],
  '原图缺失或损坏：{count}；成图可正常恢复': ['Missing or damaged source images: {count}; generated images can still be restored', '元画像の欠落・破損：{count}。生成画像は復元できます', '원본 이미지 누락·손상: {count}; 생성 이미지는 복원할 수 있습니다'],
  '无法打开目录选择器，请重新点击“从备份恢复相册”并选择目录。': ['Could not open the folder picker. Click “Restore album from backup” again and choose a folder.', 'フォルダー選択を開けませんでした。「バックアップからアルバムを復元」をもう一度クリックして選択してください。', '폴더 선택 창을 열 수 없습니다. “백업에서 앨범 복원”을 다시 클릭해 폴더를 선택하세요.'],
  '所选反推模型已不可用，请重新选择模型': ['The selected analysis model is unavailable. Select a model again.', '選択した解析モデルは利用できません。モデルを選び直してください。', '선택한 분석 모델을 사용할 수 없습니다. 모델을 다시 선택하세요.'],
  '所选生图模型已不可用，请重新选择模型': ['The selected image model is unavailable. Select a model again.', '選択した画像生成モデルは利用できません。モデルを選び直してください。', '선택한 이미지 생성 모델을 사용할 수 없습니다. 모델을 다시 선택하세요.'],
  '反推接口返回的文本内容无效，请重试': ['The analysis service returned invalid text. Try again.', '解析サービスが無効なテキストを返しました。もう一度お試しください。', '분석 서비스가 잘못된 텍스트를 반환했습니다. 다시 시도하세요.']
})) {
  [EN[key], JA[key], KO[key]] = translations;
}

// Gallery read/delete errors and background job stage labels.
Object.assign(EN, {
  '删除失败：{error}': 'Delete failed: {error}',
  '相册读取失败': 'Could not read the gallery',
  '读取失败': 'Load failed',
  '重新读取相册': 'Reload Gallery',
  '当前插件版本无法读取较新版本的相册数据库，请更新插件后重试。': 'This extension version cannot read a newer gallery database. Update the extension and try again.',
  '相册数据仍可能保存在本机，请勿卸载插件或清除浏览数据。': 'Your gallery data may still be stored locally. Do not uninstall the extension or clear browsing data.',
  '正在反推提示词': 'Reconstructing prompt',
  '正在生成惊喜提示词': 'Generating surprise prompt',
  '反推完成': 'Prompt reconstructed',
  '正在替换角色或者物品': 'Replacing character or object',
  '下载整个相册（共 0 张）': 'Download Entire Gallery (0 images)'
});
Object.assign(JA, {
  '删除失败：{error}': '削除に失敗しました：{error}',
  '相册读取失败': 'アルバムを読み込めませんでした',
  '读取失败': '読み込みに失敗しました',
  '重新读取相册': 'アルバムを再読み込み',
  '当前插件版本无法读取较新版本的相册数据库，请更新插件后重试。': '現在の拡張機能では新しいバージョンのアルバムデータベースを読み込めません。拡張機能を更新して再試行してください。',
  '相册数据仍可能保存在本机，请勿卸载插件或清除浏览数据。': 'アルバムデータは端末内に残っている可能性があります。拡張機能を削除したり閲覧データを消去したりしないでください。',
  '正在反推提示词': 'プロンプトを解析中',
  '正在生成惊喜提示词': 'ランダムプロンプトを生成中',
  '反推完成': '解析が完了しました',
  '正在替换角色或者物品': '人物またはアイテムを置換中',
  '下载整个相册（共 0 张）': 'アルバム全体をダウンロード（0枚）'
});
Object.assign(KO, {
  '删除失败：{error}': '삭제 실패: {error}',
  '相册读取失败': '앨범을 읽지 못했습니다',
  '读取失败': '읽기 실패',
  '重新读取相册': '앨범 다시 읽기',
  '当前插件版本无法读取较新版本的相册数据库，请更新插件后重试。': '현재 확장 프로그램 버전에서는 더 새로운 버전의 앨범 데이터베이스를 읽을 수 없습니다. 확장 프로그램을 업데이트한 후 다시 시도하세요.',
  '相册数据仍可能保存在本机，请勿卸载插件或清除浏览数据。': '앨범 데이터는 이 기기에 남아 있을 수 있습니다. 확장 프로그램을 삭제하거나 브라우징 데이터를 지우지 마세요.',
  '正在反推提示词': '프롬프트 분석 중',
  '正在生成惊喜提示词': '랜덤 프롬프트 생성 중',
  '反推完成': '분석 완료',
  '正在替换角色或者物品': '인물 또는 사물 교체 중',
  '下载整个相册（共 0 张）': '전체 앨범 다운로드(0장)'
});
// The guided workspace, settings flow, and gallery share the same concise labels.
const UI_REFRESH_TRANSLATIONS = {
  '原替换图片已不可用，请重新选择图片后开始替换': ['The original replacement image is unavailable. Select an image and start a new replacement.', '元の置換画像を利用できません。画像を選び直して置換を開始してください。', '원래 교체 이미지가 없습니다. 이미지를 다시 선택한 후 교체를 시작하세요.'],
  '原替换素材已删除或不可用，请重新选择素材后开始替换': ['The original replacement asset was deleted or is unavailable. Select an asset and start a new replacement.', '元の置換素材が削除されたか利用できません。素材を選び直して置換を開始してください。', '원래 교체 소재가 삭제되었거나 사용할 수 없습니다. 소재를 다시 선택한 후 교체를 시작하세요.'],
  '原替换指令缺失，请重新设置后开始替换': ['The original replacement instructions are missing. Set them again and start a new replacement.', '元の置換指示がありません。指示を設定し直して置換を開始してください。', '원래 교체 지시문이 없습니다. 다시 설정한 후 교체를 시작하세요.'],
  '返回开始页': ['Back to start', '開始画面に戻る', '시작 화면으로 돌아가기'],
  '相册': ['Gallery', 'アルバム', '앨범'],
  '更多工具': ['More tools', 'その他のツール', '더 많은 도구'],
  '更多': ['More', 'その他', '더 보기'],
  '随机灵感': ['Random inspiration', 'ランダムなアイデア', '랜덤 아이디어'],
  '网页魔法按钮': ['Web image button', 'ウェブ画像のマジックボタン', '웹 이미지 매직 버튼'],
  '创作步骤': ['Creation steps', '作成の手順', '제작 단계'],
  '创作方式': ['Creation mode', '作成方法', '제작 방식'],
  '参考图': ['Reference image', '参考画像', '참고 이미지'],
  '生成图片': ['Generate image', '画像を生成', '이미지 생성'],
  '生图任务进度': ['Image generation progress', '画像生成の進捗', '이미지 생성 진행 상태'],
  '已开始生成，可继续查看已有图片': ['Generation started. You can keep viewing your images.', '画像生成を開始しました。これまでの画像を引き続き確認できます。', '이미지 생성을 시작했습니다. 기존 이미지를 계속 확인할 수 있습니다.'],
  '今天想怎么创作？': ['What would you like to create?', '今日は何を作りますか？', '오늘은 무엇을 만들어 볼까요?'],
  '从一张喜欢的图片，或一句灵感开始。': ['Start with an image you like or an idea.', '好きな画像やアイデアから始めましょう。', '마음에 드는 이미지나 아이디어로 시작하세요.'],
  '先完成一次配置': ['Set up once to get started', '最初に設定しましょう', '먼저 초기 설정을 완료하세요'],
  '选择平台 → 填入密钥 → 选择模型 → 保存': ['Choose provider → Add key → Pick models → Save', 'プラットフォーム選択 → キー入力 → モデル選択 → 保存', '플랫폼 선택 → 키 입력 → 모델 선택 → 저장'],
  '开始配置': ['Start setup', '設定を始める', '설정 시작'],
  '参考图拍同款': ['Create from a reference', '参考画像から作成', '참고 이미지로 만들기'],
  '在网页图片上点击魔法按钮，或选择本地图片。': ['Click the magic button on a web image, or choose an image from your device.', 'ウェブ画像のマジックボタンを押すか、端末内の画像を選択してください。', '웹 이미지의 매직 버튼을 누르거나 기기에서 이미지를 선택하세요.'],
  '选择图片': ['Choose image', '画像を選択', '이미지 선택'],
  '也可以直接拖入图片；优先读取图片中的提示词。': ['You can also drop an image here. Embedded prompts are read first.', '画像をドラッグすることもできます。埋め込みプロンプトを優先して読み取ります。', '이미지를 끌어 놓아도 됩니다. 포함된 프롬프트를 먼저 읽습니다.'],
  '输入提示词': ['Enter a prompt', 'プロンプトを入力', '프롬프트 입력'],
  '把自己的想法变成图片': ['Turn your idea into an image', 'アイデアを画像にする', '아이디어를 이미지로 만들기'],
  '让 AI 为你准备提示词': ['Let AI suggest a prompt', 'AIにプロンプトを考えてもらう', 'AI에게 프롬프트 추천받기'],
  '浏览相册': ['Browse gallery', 'アルバムを見る', '앨범 둘러보기'],
  '查看作品，继续创作': ['View your images and keep creating', '作品を見て、続きを作る', '작품을 보고 계속 만들기'],
  '① 选择参考图': ['① Choose a reference', '① 参考画像を選択', '① 참고 이미지 선택'],
  '收起预览': ['Hide preview', 'プレビューを閉じる', '미리보기 접기'],
  '展开预览': ['Show preview', 'プレビューを開く', '미리보기 펼치기'],
  '换图': ['Change image', '画像を変更', '이미지 변경'],
  '参考图缩略图': ['Reference thumbnail', '参考画像のサムネイル', '참고 이미지 썸네일'],
  '② 查看或修改提示词': ['② Review or edit the prompt', '② プロンプトを確認・編集', '② 프롬프트 확인 및 수정'],
  '看图模型': ['Vision model', '画像解析モデル', '이미지 분석 모델'],
  '生图模型': ['Image model', '画像生成モデル', '이미지 생성 모델'],
  '③ 生成图片': ['③ Generate image', '③ 画像を生成', '③ 이미지 생성'],
  '高级指令': ['Advanced instructions', '詳細な指示', '고급 지침'],
  '已有默认指令，可按需修改。': ['Default instructions are ready. Edit them as needed.', '標準の指示が設定されています。必要に応じて編集できます。', '기본 지침이 준비되어 있습니다. 필요에 따라 수정하세요.'],
  '当前原图': ['Current original', '現在の元画像', '현재 원본 이미지'],
  '替换素材': ['Replacement reference', '置き換え用素材', '교체할 참고 소재'],
  '创作操作': ['Creation actions', '作成操作', '제작 작업'],
  '返回生成': ['Back to generation', '画像生成に戻る', '이미지 생성으로 돌아가기'],
  '替换素材后，保留原图构图': ['Replace the subject while keeping the composition', '元画像の構図を保って置き換えます', '원본 구도를 유지하며 소재를 교체합니다'],
  '请选择生图模型': ['Choose an image model', '画像生成モデルを選択', '이미지 생성 모델을 선택하세요'],
  '参考图已就绪 · {width}×{height}': ['Reference ready · {width}×{height}', '参考画像の準備完了 · {width}×{height}', '참고 이미지 준비됨 · {width}×{height}'],
  '切换后自动保存为默认模型': ['Changes are saved as the default model', '切り替え後、自動で既定のモデルに保存', '변경하면 기본 모델로 자동 저장됩니다'],
  '连接你的 AI 平台，开始拍同款': ['Connect your AI provider and start creating', 'AIプラットフォームに接続して作成を始める', 'AI 플랫폼을 연결하고 제작을 시작하세요'],
  '开始使用': ['Getting started', '使い始める', '시작하기'],
  '四步完成配置': ['Set up in four steps', '4つの手順で設定', '네 단계로 설정 완료'],
  '选择平台': ['Choose provider', 'プラットフォームを選択', '플랫폼 선택'],
  '使用已有接口，或添加新接口': ['Use an existing API or add a new one', '既存のAPIを使うか、新しく追加', '기존 API를 사용하거나 새로 추가'],
  '填入 API Key': ['Enter API key', 'APIキーを入力', 'API 키 입력'],
  '粘贴所选平台的密钥': ['Paste the key for your provider', '選択したプラットフォームのキーを貼り付け', '선택한 플랫폼의 키 붙여넣기'],
  '选择默认模型': ['Choose default models', '既定のモデルを選択', '기본 모델 선택'],
  '反推读懂图片，生图生成作品': ['Vision reads images; generation creates them', '解析モデルは画像を読み取り、生成モデルは作品を作成', '분석 모델은 이미지를 읽고 생성 모델은 작품을 제작'],
  '保存并开始': ['Save and start', '保存して始める', '저장하고 시작'],
  '回到网页，悬停图片开始创作': ['Return to a web image and hover to start', 'ウェブ画像にマウスを合わせて作成開始', '웹페이지로 돌아가 이미지에 마우스를 올려 시작'],
  '选择平台并填写密钥，再启用需要的反推或生图模型。': ['Choose a provider, enter its key, and enable the vision or image models you need.', 'プラットフォームとキーを設定し、必要な解析・生成モデルを有効にしてください。', '플랫폼을 선택하고 키를 입력한 뒤 필요한 분석 또는 이미지 생성 모델을 활성화하세요.'],
  '反推模型负责看图生成提示词，生图模型负责生成图片。在这里修改后，请点击“保存设置”。': ['Vision models read images and create prompts; image models generate images. Click “Save Settings” after making changes here.', '解析モデルは画像からプロンプトを作り、生成モデルは画像を作成します。ここで変更した後は「設定を保存」を押してください。', '분석 모델은 이미지를 읽고 프롬프트를 만들며, 이미지 생성 모델은 이미지를 만듭니다. 변경 후 “설정 저장”을 누르세요.'],
  '先选择常用比例；像素映射与图像质量可按需调整。': ['Choose your usual ratio first. Adjust pixel sizes and quality as needed.', 'よく使う比率を選び、ピクセルサイズと画質は必要に応じて調整してください。', '자주 쓰는 비율을 먼저 선택하세요. 픽셀 크기와 품질은 필요에 따라 조정할 수 있습니다.'],
  '高级尺寸与质量': ['Advanced size and quality', 'サイズと画質の詳細設定', '고급 크기 및 품질'],
  '使用默认值即可开始': ['Default values are ready to use', '標準値のまま始められます', '기본값으로 바로 시작할 수 있습니다'],
  '重装或换设备时使用': ['For reinstalls or a new device', '再インストールや機種変更時に使用', '재설치하거나 기기를 바꿀 때 사용'],
  '自动备份、校验与恢复作品': ['Automatically back up, verify, and restore images', '作品の自動バックアップ・検証・復元', '작품 자동 백업, 검증 및 복원'],
  '设置页的修改需点击保存后生效。': ['Changes here take effect after saving.', 'このページの変更は保存後に反映されます。', '이 페이지의 변경 사항은 저장 후 적용됩니다.'],
  '正在读取设置…': ['Loading settings…', '設定を読み込み中…', '설정을 읽는 중…'],
  '正在保存…': ['Saving…', '保存中…', '저장 중…'],
  '正在保存设置…': ['Saving settings…', '設定を保存中…', '설정 저장 중…'],
  '有未保存的修改': ['Unsaved changes', '未保存の変更があります', '저장하지 않은 변경 사항이 있습니다'],
  '所有修改已保存': ['All changes saved', 'すべての変更を保存しました', '모든 변경 사항이 저장되었습니다'],
  '保存后，新任务会使用这些设置。': ['New tasks will use these settings after saving.', '保存後、新しいタスクにはこの設定が使われます。', '저장 후 새 작업에 이 설정이 적용됩니다.'],
  '回到网页，悬停图片并点击魔法按钮即可开始。': ['Return to a web image, hover, and click the magic button to start.', 'ウェブ画像にマウスを合わせ、マジックボタンを押すと始められます。', '웹페이지로 돌아가 이미지에 마우스를 올리고 매직 버튼을 눌러 시작하세요.'],
  '基础配置已填写，保存后即可尝试。': ['Basic setup is ready. Save to try it.', '基本設定ができました。保存すると試せます。', '기본 설정이 완료되었습니다. 저장 후 사용해 보세요.'],
  '请填写默认模型所用平台的密钥。': ['Enter the API key for the provider used by your default models.', '既定のモデルが使うプラットフォームのキーを入力してください。', '기본 모델이 사용하는 플랫폼의 키를 입력하세요.'],
  '请先启用反推与生图模型。': ['Enable vision and image models first.', 'まず解析モデルと画像生成モデルを有効にしてください。', '먼저 분석 및 이미지 생성 모델을 활성화하세요.'],
  '编辑名称': ['Edit name', '名前を編集', '이름 편집'],
  '显示名称': ['Display name', '表示名', '표시 이름'],
  '看图生成提示词': ['Read images to create prompts', '画像からプロンプトを作成', '이미지를 읽고 프롬프트 만들기'],
  '获取密钥': ['Get key', 'キーを取得', '키 발급받기'],
  '手动添加模型（高级）': ['Add a model manually (advanced)', 'モデルを手動で追加（詳細）', '모델 직접 추가(고급)'],
  '模型名称': ['Model name', 'モデル名', '모델 이름'],
  '勾选模型用途，再在下方选择默认模型。': ['Enable a model capability, then choose your defaults below.', 'モデルの用途にチェックを入れ、下で既定のモデルを選択してください。', '모델 용도를 선택한 뒤 아래에서 기본 모델을 지정하세요.'],
  '搜索相册': ['Search gallery', 'アルバムを検索', '앨범 검색'],
  '选择本页': ['Select this page', 'このページを選択', '현재 페이지 선택'],
  '取消本页选择': ['Deselect this page', 'このページの選択を解除', '현재 페이지 선택 해제'],
  '取消选择': ['Clear selection', '選択を解除', '선택 해제'],
  '下载选中': ['Download selected', '選択した画像をダウンロード', '선택 항목 다운로드'],
  '删除选中': ['Delete selected', '選択した画像を削除', '선택 항목 삭제'],
  '对比原图': ['Compare original', '元画像と比較', '원본과 비교'],
  '结束对比': ['End comparison', '比較を終了', '비교 종료'],
  '继续创作': ['Keep creating', '続きを作る', '계속 만들기'],
  '图片信息': ['Image details', '画像の詳細', '이미지 정보']
};
for (const [key, translations] of Object.entries(UI_REFRESH_TRANSLATIONS)) {
  [EN, JA, KO].forEach((dictionary, index) => { dictionary[key] = translations[index]; });
}

const AUDIT_REPAIR_TRANSLATIONS = {
  '尚未配置反推模型 API Key，请前往设置页填写': ['The vision model API key is missing. Add it in Settings.', '画像解析モデルのAPIキーが未設定です。設定で入力してください。', '이미지 분석 모델의 API 키가 없습니다. 설정에서 입력해 주세요.'],
  '反推模型的 Base URL / 模型名未配置完整': ['The vision model Base URL or model name is missing.', '画像解析モデルのBase URLまたはモデル名が未設定です。', '이미지 분석 모델의 Base URL 또는 모델 이름이 없습니다.'],
  '尚未配置生图模型 API Key，请前往设置页填写': ['The image model API key is missing. Add it in Settings.', '画像生成モデルのAPIキーが未設定です。設定で入力してください。', '이미지 생성 모델의 API 키가 없습니다. 설정에서 입력해 주세요.'],
  '生图模型的 Base URL / 模型名未配置完整': ['The image model Base URL or model name is missing.', '画像生成モデルのBase URLまたはモデル名が未設定です。', '이미지 생성 모델의 Base URL 또는 모델 이름이 없습니다.'],
  'Base URL 必须使用 HTTPS；仅本机 localhost 调试允许 HTTP': ['Base URLs must use HTTPS. HTTP is allowed only for local loopback services.', 'Base URLにはHTTPSが必要です。HTTPはローカルのループバックサービスのみ利用できます。', 'Base URL은 HTTPS를 사용해야 합니다. HTTP는 로컬 루프백 서비스에서만 허용됩니다.'],
  'Base URL 格式不正确': ['The Base URL format is invalid.', 'Base URLの形式が正しくありません。', 'Base URL 형식이 올바르지 않습니다.'],
  '模型列表接口未返回有效模型数据，请检查 Base URL、密钥及接口协议': ['The model-list API did not return valid model data. Check the Base URL, key, and API protocol.', 'モデル一覧APIから有効なモデルデータが返されませんでした。Base URL、キー、APIプロトコルを確認してください。', '모델 목록 API가 유효한 모델 데이터를 반환하지 않았습니다. Base URL, 키, API 프로토콜을 확인해 주세요.'],
  '接口可访问，但未返回可用模型，请检查 Base URL、密钥及模型权限': ['The API is reachable but returned no usable models. Check the Base URL, key, and model permissions.', 'APIにはアクセスできますが、利用可能なモデルが返されませんでした。Base URL、キー、モデルの権限を確認してください。', 'API에 접근할 수 있지만 사용 가능한 모델이 반환되지 않았습니다. Base URL, 키, 모델 권한을 확인해 주세요.'],
  '公开模型目录可访问，获取到 {count} 个 fal.ai 图片模型；尚未验证 API Key 或生成权限': ['The public catalog is reachable and returned {count} fal.ai image models. The API key and generation permissions have not been verified.', '公開カタログにアクセスし、fal.aiの画像モデルを{count}件取得しました。APIキーや生成権限はまだ検証されていません。', '공개 카탈로그에 접근하여 fal.ai 이미지 모델 {count}개를 가져왔습니다. API 키와 생성 권한은 아직 확인되지 않았습니다.'],
  '打开备份设置': ['Open backup settings', 'バックアップ設定を開く', '백업 설정 열기'],
  '保存目录：{directory}': ['Save folder: {directory}', '保存先：{directory}', '저장 폴더: {directory}'],
  '其中 {count} 张图片尚未成功备份或备份失败，删除可能丢失唯一副本。仍要永久删除吗？': [
    '{count} image(s) have not been backed up successfully or their backup failed. Deleting them may remove the only copy. Permanently delete them anyway?',
    '{count}枚はまだバックアップが完了していないか、バックアップに失敗しています。削除すると唯一のコピーを失う可能性があります。それでも完全に削除しますか？',
    '이미지 {count}장은 백업이 완료되지 않았거나 백업에 실패했습니다. 삭제하면 유일한 사본이 사라질 수 있습니다. 그래도 영구 삭제할까요?'
  ],
  '选择第 {index} 张图片：{prompt}': ['Select image {index}: {prompt}', '{index}枚目を選択：{prompt}', '이미지 {index} 선택: {prompt}'],
  '来源图片保存失败，请重试': ['Could not save the source image. Please try again.', '元画像を保存できませんでした。もう一度お試しください。', '원본 이미지를 저장하지 못했습니다. 다시 시도해 주세요.'],
  '来源图片缓存已失效，请重新选择图片': ['The cached source image is no longer available. Please select it again.', '元画像のキャッシュが利用できなくなりました。画像を選び直してください。', '캐시된 원본 이미지를 더 이상 사용할 수 없습니다. 이미지를 다시 선택해 주세요.'],
  '来源图片缓存正被其他页面占用，请关闭其他面板后重试': ['The source image cache is in use by another page. Close other panels and try again.', '元画像のキャッシュは別のページで使用中です。他のパネルを閉じてから再試行してください。', '다른 페이지에서 원본 이미지 캐시를 사용 중입니다. 다른 패널을 닫고 다시 시도해 주세요.'],
  '来源图片缓存写入已中止': ['Writing the source image cache was aborted.', '元画像のキャッシュへの書き込みが中止されました。', '원본 이미지 캐시 쓰기가 중단되었습니다.'],
  '原窗口已关闭，请重新打开侧边栏': ['The original window has closed. Please reopen the side panel.', '元のウィンドウは閉じられました。サイドパネルを開き直してください。', '원래 창이 닫혔습니다. 사이드 패널을 다시 열어 주세요.'],
  '来源图片不能为空': ['The source image cannot be empty.', '元画像を空にすることはできません。', '원본 이미지는 비워 둘 수 없습니다.'],
  '来源图片已失效，请重新选择图片': ['The source image is no longer available. Please select it again.', '元画像が利用できなくなりました。画像を選び直してください。', '원본 이미지를 더 이상 사용할 수 없습니다. 이미지를 다시 선택해 주세요.'],
  '停止全部生成': ['Stop all generation', 'すべての生成を停止', '모든 생성 중지'],
  '停止生成': ['Stop generation', '生成を停止', '생성 중지'],
  '正在停止生成…': ['Stopping generation…', '生成を停止しています…', '생성을 중지하는 중…'],
  '已停止本地等待；平台上的任务可能仍在运行': ['Stopped waiting locally; the provider task may still be running.', 'この端末での待機を停止しました。サービス側の処理は続いている可能性があります。', '로컬 대기를 중지했습니다. 플랫폼의 작업은 계속 실행 중일 수 있습니다.'],
  '当前没有可停止的生图任务': ['There are no image generation tasks to stop.', '停止できる画像生成タスクはありません。', '중지할 이미지 생성 작업이 없습니다.'],
  '该 RunningHUB 模型不支持双图参考，请选择支持至少两张图片的模型': ['This RunningHUB model does not support two reference images. Choose a model that supports at least two images.', 'このRunningHUBモデルは2枚の参照画像に対応していません。2枚以上に対応したモデルを選んでください。', '이 RunningHUB 모델은 두 장의 참고 이미지를 지원하지 않습니다. 최소 두 장을 지원하는 모델을 선택해 주세요.'],
  '当前 OpenRouter 模型不支持 quality {value}': ['This OpenRouter model does not support quality {value}.', 'このOpenRouterモデルはquality {value}に対応していません。', '이 OpenRouter 모델은 quality {value}를 지원하지 않습니다.'],
  '生图任务等待超过 {minutes} 分钟，请稍后到平台查看任务状态': ['Image generation has been waiting for over {minutes} minute(s). Check the task status on the provider later.', '画像生成の待機が{minutes}分を超えました。しばらくしてからサービス側でタスクの状態を確認してください。', '이미지 생성 대기가 {minutes}분을 초과했습니다. 잠시 후 플랫폼에서 작업 상태를 확인해 주세요.'],
  '生成结果图片地址无效': ['The generated image URL is invalid.', '生成画像のURLが無効です。', '생성된 이미지 주소가 올바르지 않습니다.'],
  '生成结果图片地址不能包含认证信息': ['The generated image URL must not contain credentials.', '生成画像のURLに認証情報を含めることはできません。', '생성된 이미지 주소에는 인증 정보를 포함할 수 없습니다.'],
  '生成结果图片地址不安全：只允许 HTTPS 公网地址或当前本地平台地址': ['The generated image URL is unsafe. Only public HTTPS URLs or the current local provider address are allowed.', '生成画像のURLは安全ではありません。公開HTTPSアドレスまたは現在のローカルサービスのアドレスのみ利用できます。', '생성된 이미지 주소가 안전하지 않습니다. 공개 HTTPS 주소 또는 현재 로컬 플랫폼 주소만 허용됩니다.'],
  '生图接口返回了无效的图片 data URL': ['The image API returned an invalid image data URL.', '画像APIから無効な画像data URLが返されました。', '이미지 API가 잘못된 이미지 data URL을 반환했습니다.']
};
for (const [key, translations] of Object.entries(AUDIT_REPAIR_TRANSLATIONS)) {
  [EN, JA, KO].forEach((dictionary, index) => { dictionary[key] = translations[index]; });
}

const REVIEW_FIX_TRANSLATIONS = {
  '组图': ['Image set', '画像セット', '이미지 세트'],
  '上一张图片的{action}正在后台进行，已等待 {seconds} 秒…': ['{action} for the previous image is running in the background. Waiting for {seconds} seconds…', '前の画像の{action}をバックグラウンドで実行中です。{seconds}秒待機しています…', '이전 이미지의 {action} 작업이 백그라운드에서 진행 중입니다. {seconds}초 동안 대기 중…'],
  '上一张图片的{action}失败：{error}': ['{action} for the previous image failed: {error}', '前の画像の{action}に失敗しました：{error}', '이전 이미지의 {action} 실패: {error}'],
  '上一张图片的{action}已停止': ['{action} for the previous image has stopped.', '前の画像の{action}を停止しました。', '이전 이미지의 {action} 작업이 중지되었습니다.'],
  '上一张图片的{action}已完成，结果已保存到相册': ['{action} for the previous image is complete. The results are saved to the gallery.', '前の画像の{action}が完了し、結果をアルバムに保存しました。', '이전 이미지의 {action} 작업이 완료되어 결과를 앨범에 저장했습니다.'],
  '当前任务尚未完成，请等待完成或停止任务后再返回开始页': ['The current task is not finished. Wait for it to finish or stop it before returning to Home.', '現在のタスクは未完了です。完了するまで待つか、停止してから開始ページに戻ってください。', '현재 작업이 완료되지 않았습니다. 완료될 때까지 기다리거나 작업을 중지한 후 시작 페이지로 돌아가세요.'],
  '请先在设置中启用并选择生图模型': ['Enable and select an image model in Settings first.', 'まず設定で画像生成モデルを有効にして選択してください。', '먼저 설정에서 이미지 생성 모델을 활성화하고 선택하세요.'],
  '当前模型不支持图生图/编辑，请切换到支持图片编辑的模型': ['The current model does not support image editing. Switch to a model that supports it.', '現在のモデルは画像編集に対応していません。画像編集に対応したモデルに切り替えてください。', '현재 모델은 이미지 편집을 지원하지 않습니다. 이미지 편집을 지원하는 모델로 전환하세요.'],
  '当前平台还没有配置 API Key，请前往设置页填写': ['The current provider has no API key configured. Add it in Settings.', '現在のプラットフォームのAPIキーが未設定です。設定で入力してください。', '현재 플랫폼의 API 키가 설정되지 않았습니다. 설정에서 입력하세요.'],
  '该模型只支持 1 张参考图，无法同时提交原图和素材': ['This model supports only one reference image, so the source image and material cannot be submitted together.', 'このモデルは参照画像1枚のみに対応しています。元画像と素材を同時に送信することはできません。', '이 모델은 참고 이미지 한 장만 지원하므로 원본 이미지와 소재를 함께 제출할 수 없습니다.'],
  '其中 {count} 张图片备份失败。': ['Backup failed for {count} image(s).', '{count}枚のバックアップに失敗しています。', '이미지 {count}장의 백업에 실패했습니다.'],
  '其中 {count} 张图片的备份尚未完成。': ['Backup has not finished for {count} image(s).', '{count}枚のバックアップがまだ完了していません。', '이미지 {count}장의 백업이 아직 완료되지 않았습니다.'],
  '其中 {count} 张图片尚无成功备份。': ['{count} image(s) do not have a successful backup.', '{count}枚には成功したバックアップがありません。', '이미지 {count}장에 성공한 백업이 없습니다.'],
  '本地备份当前未启用。': ['Local backup is currently disabled.', 'ローカルバックアップは現在無効です。', '로컬 백업이 현재 비활성화되어 있습니다.'],
  '删除可能丢失这些图片的唯一副本。仍要永久删除吗？': ['Deleting these images may remove their only copy. Permanently delete them anyway?', '削除すると、これらの画像の唯一のコピーを失う可能性があります。それでも完全に削除しますか？', '삭제하면 이 이미지들의 유일한 사본이 사라질 수 있습니다. 그래도 영구 삭제할까요?'],
  '默认模型使用的平台尚未配置：{platforms}。请填写这些平台的 Base URL 与 API Key，或改选已配置平台的默认模型。': ['The providers used by the default models are not configured: {platforms}. Enter their Base URL and API key, or choose default models from configured providers.', '既定のモデルが使うプラットフォームが未設定です：{platforms}。これらのBase URLとAPIキーを入力するか、設定済みプラットフォームのモデルを既定に選んでください。', '기본 모델이 사용하는 플랫폼이 설정되지 않았습니다: {platforms}. 해당 플랫폼의 Base URL과 API 키를 입력하거나 설정된 플랫폼의 모델을 기본값으로 선택하세요.'],
  '打开相册失败：{error}': ['Could not open the gallery: {error}', 'アルバムを開けませんでした：{error}', '앨범을 열지 못했습니다: {error}'],
  '请求超时，请检查网络或代理': ['The request timed out. Check your network or proxy.', 'リクエストがタイムアウトしました。ネットワークまたはプロキシを確認してください。', '요청 시간이 초과되었습니다. 네트워크 또는 프록시를 확인하세요.'],
  '请求超时': ['The request timed out.', 'リクエストがタイムアウトしました。', '요청 시간이 초과되었습니다.'],
  '生图接口未返回图片': ['The image generation API returned no image.', '画像生成APIから画像が返されませんでした。', '이미지 생성 API가 이미지를 반환하지 않았습니다.'],
  '反推接口未返回内容': ['The image analysis API returned no content.', '画像解析APIから内容が返されませんでした。', '이미지 분석 API가 내용을 반환하지 않았습니다.'],
  '下载生成图超时': ['Downloading the generated image timed out.', '生成画像のダウンロードがタイムアウトしました。', '생성된 이미지 다운로드 시간이 초과되었습니다.'],
  '下载生成结果超时': ['Downloading the generated result timed out.', '生成結果のダウンロードがタイムアウトしました。', '생성 결과 다운로드 시간이 초과되었습니다.'],
  '图生图请求超时': ['The image editing request timed out.', '画像編集リクエストがタイムアウトしました。', '이미지 편집 요청 시간이 초과되었습니다.'],
  '获取模型列表超时': ['Fetching the model list timed out.', 'モデル一覧の取得がタイムアウトしました。', '모델 목록을 가져오는 시간이 초과되었습니다.'],
  'APImart 反推接口未返回内容': ['The APImart image analysis API returned no content.', 'APImartの画像解析APIから内容が返されませんでした。', 'APImart 이미지 분석 API가 내용을 반환하지 않았습니다.'],
  'APImart 反推模型未返回随机提示词': ['The APImart vision model returned no random prompt.', 'APImartの画像解析モデルからランダムプロンプトが返されませんでした。', 'APImart 분석 모델이 랜덤 프롬프트를 반환하지 않았습니다.'],
  'APImart 图片上传超时': ['The APImart image upload timed out.', 'APImartへの画像アップロードがタイムアウトしました。', 'APImart 이미지 업로드 시간이 초과되었습니다.'],
  'APImart 生图提交成功，但未返回 task_id': ['APImart accepted the image task but returned no task_id.', 'APImartは画像生成を受け付けましたが、task_idを返しませんでした。', 'APImart가 이미지 작업을 접수했지만 task_id를 반환하지 않았습니다.'],
  'APImart 任务已完成，但未返回图片地址': ['The APImart task finished but returned no image URL.', 'APImartのタスクは完了しましたが、画像URLが返されませんでした。', 'APImart 작업이 완료되었지만 이미지 URL을 반환하지 않았습니다.'],
  'OpenRouter 生图接口未返回图片': ['The OpenRouter image API returned no image.', 'OpenRouterの画像生成APIから画像が返されませんでした。', 'OpenRouter 이미지 API가 이미지를 반환하지 않았습니다.'],
  'fal.ai 请求超时，请稍后重试': ['The fal.ai request timed out. Try again later.', 'fal.aiのリクエストがタイムアウトしました。しばらくしてから再試行してください。', 'fal.ai 요청 시간이 초과되었습니다. 잠시 후 다시 시도하세요.'],
  'fal.ai 生成超时，请稍后到 fal.ai 队列查看任务状态': ['The fal.ai task timed out. Check its status in the fal.ai queue later.', 'fal.aiの生成がタイムアウトしました。後でfal.aiのキューでタスクの状態を確認してください。', 'fal.ai 생성 시간이 초과되었습니다. 나중에 fal.ai 대기열에서 작업 상태를 확인하세요.'],
  'fal.ai 未返回 request_id': ['fal.ai returned no request_id.', 'fal.aiからrequest_idが返されませんでした。', 'fal.ai가 request_id를 반환하지 않았습니다.'],
  'fal.ai 生图接口未返回图片地址': ['The fal.ai image API returned no image URL.', 'fal.aiの画像生成APIから画像URLが返されませんでした。', 'fal.ai 이미지 API가 이미지 URL을 반환하지 않았습니다.'],
  'AtlasCloud 图片上传超时': ['The AtlasCloud image upload timed out.', 'AtlasCloudへの画像アップロードがタイムアウトしました。', 'AtlasCloud 이미지 업로드 시간이 초과되었습니다.'],
  'AtlasCloud 图片上传成功，但未返回 download_url': ['AtlasCloud uploaded the image but returned no download_url.', 'AtlasCloudへの画像アップロードは成功しましたが、download_urlが返されませんでした。', 'AtlasCloud 이미지 업로드가 완료되었지만 download_url을 반환하지 않았습니다.'],
  'RunningHUB 来源图片上传超时': ['The RunningHUB source image upload timed out.', 'RunningHUBへの元画像アップロードがタイムアウトしました。', 'RunningHUB 원본 이미지 업로드 시간이 초과되었습니다.'],
  'RunningHUB 生成超时，请稍后重试': ['RunningHUB generation timed out. Try again later.', 'RunningHUBの生成がタイムアウトしました。しばらくしてから再試行してください。', 'RunningHUB 생성 시간이 초과되었습니다. 잠시 후 다시 시도하세요.'],
  'RunningHUB 未返回 taskId': ['RunningHUB returned no taskId.', 'RunningHUBからtaskIdが返されませんでした。', 'RunningHUB가 taskId를 반환하지 않았습니다.'],
  'ZenMux 图生图请求超时': ['The ZenMux image editing request timed out.', 'ZenMuxの画像編集リクエストがタイムアウトしました。', 'ZenMux 이미지 편집 요청 시간이 초과되었습니다.'],
  '接口错误 HTTP {status}{detail}': ['API error HTTP {status}{detail}', 'APIエラー HTTP {status}{detail}', 'API 오류 HTTP {status}{detail}'],
  '{provider} 接口错误 HTTP {status}{detail}': ['{provider} API error HTTP {status}{detail}', '{provider} APIエラー HTTP {status}{detail}', '{provider} API 오류 HTTP {status}{detail}'],
  'HTTP {status}，请检查 Base URL 与密钥': ['HTTP {status}. Check the Base URL and API key.', 'HTTP {status}。Base URLとAPIキーを確認してください。', 'HTTP {status}. Base URL과 API 키를 확인하세요.'],
  '下载生成图失败 HTTP {status}': ['Could not download the generated image: HTTP {status}', '生成画像のダウンロードに失敗しました：HTTP {status}', '생성된 이미지를 다운로드하지 못했습니다: HTTP {status}'],
  '下载生成结果失败 HTTP {status}': ['Could not download the generated result: HTTP {status}', '生成結果のダウンロードに失敗しました：HTTP {status}', '생성 결과를 다운로드하지 못했습니다: HTTP {status}'],
  '{provider} 图片上传失败 HTTP {status}{detail}': ['{provider} image upload failed: HTTP {status}{detail}', '{provider}への画像アップロードに失敗しました：HTTP {status}{detail}', '{provider} 이미지 업로드 실패: HTTP {status}{detail}'],
  'RunningHUB 来源图片上传失败 HTTP {status}': ['RunningHUB source image upload failed: HTTP {status}', 'RunningHUBへの元画像アップロードに失敗しました：HTTP {status}', 'RunningHUB 원본 이미지 업로드 실패: HTTP {status}'],
  '图生图失败 HTTP {status}{detail}': ['Image editing failed: HTTP {status}{detail}', '画像編集に失敗しました：HTTP {status}{detail}', '이미지 편집 실패: HTTP {status}{detail}'],
  'ZenMux 图生图失败 HTTP {status}{detail}': ['ZenMux image editing failed: HTTP {status}{detail}', 'ZenMuxの画像編集に失敗しました：HTTP {status}{detail}', 'ZenMux 이미지 편집 실패: HTTP {status}{detail}'],
  '{provider} 生图未返回图片{detail}': ['{provider} image generation returned no image{detail}', '{provider}の画像生成から画像が返されませんでした{detail}', '{provider} 이미지 생성이 이미지를 반환하지 않았습니다{detail}']
};
for (const [key, translations] of Object.entries(REVIEW_FIX_TRANSLATIONS)) {
  [EN[key], JA[key], KO[key]] = translations;
}

const RUNNINGHUB_APP_TRANSLATIONS = {
  '模型名称、工作流或 AI 应用链接': ['Model name, workflow or AI app link', 'モデル名、ワークフローまたはAIアプリのリンク', '모델 이름, 워크플로 또는 AI 앱 링크'],
  '可粘贴 RunningHub 工作流或 AI 应用链接，也可输入 workflow/工作流ID 或 app/应用ID': ['Paste a RunningHub workflow or AI app link, or enter workflow/workflow-ID or app/app-ID', 'RunningHubワークフローまたはAIアプリのリンク、またはworkflow/ワークフローID・app/アプリIDを入力', 'RunningHub 워크플로 또는 AI 앱 링크를 붙여넣거나 workflow/워크플로ID 또는 app/앱ID를 입력하세요'],
  '模型名称或 AI 应用链接': ['Model name or AI app link', 'モデル名またはAIアプリのリンク', '모델 이름 또는 AI 앱 링크'],
  '可粘贴 RunningHub AI 应用链接，或输入 app/应用ID': ['Paste a RunningHub AI app link, or enter app/app-ID', 'RunningHub AIアプリのリンク、またはapp/アプリIDを入力', 'RunningHub AI 앱 링크 또는 app/앱ID를 입력하세요'],
  '读取应用参数': ['Read app parameters', 'アプリのパラメータを取得', '앱 매개변수 가져오기'],
  '正在读取 AI 应用参数…': ['Reading AI app parameters…', 'AIアプリのパラメータを取得中…', 'AI 앱 매개변수를 가져오는 중…'],
  '已读取 AI 应用参数，请勾选生图并保存': ['AI app parameters loaded. Enable Image and save.', 'AIアプリのパラメータを取得しました。画像生成を有効にして保存してください。', 'AI 앱 매개변수를 가져왔습니다. 이미지 생성을 선택하고 저장하세요.'],
  'RunningHUB AI 应用未返回有效的输入参数': ['The RunningHUB AI app returned no valid input parameters.', 'RunningHUB AIアプリから有効な入力パラメータが返されませんでした。', 'RunningHUB AI 앱이 유효한 입력 매개변수를 반환하지 않았습니다.'],
  'RunningHUB AI 应用地址或 ID 无效': ['The RunningHUB AI app link or ID is invalid.', 'RunningHUB AIアプリのリンクまたはIDが無効です。', 'RunningHUB AI 앱 링크 또는 ID가 올바르지 않습니다.'],
  '未能在 RunningHUB AI 应用中唯一确定正向提示词': ['Could not identify a unique positive prompt in this RunningHUB AI app.', 'RunningHUB AIアプリの正のプロンプトを一意に特定できませんでした。', 'RunningHUB AI 앱의 긍정 프롬프트를 하나로 식별할 수 없습니다.'],
  '该 RunningHUB AI 应用的参考图数量不足': ['This RunningHUB AI app has too few reference image inputs.', 'このRunningHUB AIアプリの参照画像入力数が足りません。', '이 RunningHUB AI 앱의 참고 이미지 입력 수가 부족합니다.'],
  '该 RunningHUB AI 应用需要参考图片': ['This RunningHUB AI app requires a reference image.', 'このRunningHUB AIアプリには参照画像が必要です。', '이 RunningHUB AI 앱에는 참고 이미지가 필요합니다.'],
  '该 RunningHUB AI 应用需要插件暂不支持的输入类型': ['This RunningHUB AI app requires an input type the extension does not yet support.', 'このRunningHUB AIアプリには拡張機能が未対応の入力が必要です。', '이 RunningHUB AI 앱에는 확장이 아직 지원하지 않는 입력이 필요합니다.'],
  'RunningHUB AI 应用未返回图片': ['The RunningHUB AI app returned no image.', 'RunningHUB AIアプリから画像が返されませんでした。', 'RunningHUB AI 앱이 이미지를 반환하지 않았습니다.'],
  '读取 RunningHUB AI 应用失败 HTTP {status}': ['Could not read the RunningHUB AI app: HTTP {status}', 'RunningHUB AIアプリの取得に失敗しました：HTTP {status}', 'RunningHUB AI 앱을 가져오지 못했습니다: HTTP {status}'],
  '读取 RunningHUB AI 应用失败：{error}': ['Could not read the RunningHUB AI app: {error}', 'RunningHUB AIアプリの取得に失敗しました：{error}', 'RunningHUB AI 앱을 가져오지 못했습니다: {error}'],
  'RunningHUB AI 应用提交失败：{error}': ['RunningHUB AI app submission failed: {error}', 'RunningHUB AIアプリの送信に失敗しました：{error}', 'RunningHUB AI 앱 제출 실패: {error}'],
  'RunningHUB AI 应用生成失败：{error}': ['RunningHUB AI app generation failed: {error}', 'RunningHUB AIアプリの生成に失敗しました：{error}', 'RunningHUB AI 앱 생성 실패: {error}'],
  '该 RunningHUB AI 应用不支持所选图片比例：{value}': ['This RunningHUB AI app does not support the selected aspect ratio: {value}', 'このRunningHUB AIアプリは選択した画像比率に対応していません：{value}', '이 RunningHUB AI 앱은 선택한 이미지 비율을 지원하지 않습니다: {value}'],
  '该 RunningHUB AI 应用不支持所选图片尺寸：{value}': ['This RunningHUB AI app does not support the selected image size: {value}', 'このRunningHUB AIアプリは選択した画像サイズに対応していません：{value}', '이 RunningHUB AI 앱은 선택한 이미지 크기를 지원하지 않습니다: {value}']
};
for (const [key, translations] of Object.entries(RUNNINGHUB_APP_TRANSLATIONS)) {
  [EN[key], JA[key], KO[key]] = translations;
}

const RUNTIME_ERROR_TRANSLATIONS = {
  "相册数据库版本高于当前扩展，本次请求未提交。已保存的图片将保留。请先保留任务，待其他任务结束后更新或重新加载扩展，勿卸载扩展或清除浏览数据": ["The gallery database is newer than this extension. This request was not submitted. Previously saved images are preserved. Preserve your work and, after other tasks finish, update or reload the extension. Do not uninstall it or clear browsing data.", "アルバムのデータベースが拡張機能より新しいため、このリクエストは送信されませんでした。保存済みの画像は保持されます。作業内容を保管し、他のタスクが終了してから拡張機能を更新または再読み込みしてください。拡張機能の削除や閲覧データの消去はしないでください。", "앨범 데이터베이스가 현재 확장 프로그램보다 최신이므로 이번 요청은 전송되지 않았습니다. 이미 저장된 이미지는 보존됩니다. 작업을 보존하고 다른 작업이 끝난 뒤 확장 프로그램을 업데이트하거나 다시 로드하세요. 확장 프로그램을 삭제하거나 브라우징 데이터를 지우지 마세요."],
  "未知类型": ["unknown type", "不明な種類", "알 수 없는 유형"],
  "网络请求失败：{detail}": ["Network request failed{detail}", "ネットワークリクエストに失敗しました{detail}", "네트워크 요청 실패{detail}"],
  "请求失败": ["Request failed.", "リクエストに失敗しました。", "요청 실패."],
  "抓取图片失败 HTTP {status}": ["Could not fetch the image: HTTP {status}", "画像の取得に失敗しました：HTTP {status}", "이미지 가져오기 실패: HTTP {status}"],
  "目标不是图片（{type}），可能被站点防盗链保护": ["The target is not an image ({type}); the site may protect it against hotlinking.", "対象が画像ではありません（{type}）。サイトの直リンク保護の可能性があります。", "대상이 이미지가 아닙니다({type}). 사이트의 핫링크 보호일 수 있습니다."],
  "网页原图超过 128 MiB，改用页面像素捕获": ["The original image exceeds 128 MiB; using pixels captured from the page instead.", "元画像が128 MiBを超えているため、ページから取得したピクセルを使用します。", "원본 이미지가 128 MiB를 초과하여 페이지에서 캡처한 픽셀을 사용합니다."],
  "无法确定当前浏览器窗口": ["Could not determine the current browser window.", "現在のブラウザウィンドウを特定できません。", "현재 브라우저 창을 확인할 수 없습니다."],
  "无法确定来源图片所在窗口": ["Could not determine the window of the source image.", "元画像のウィンドウを特定できません。", "원본 이미지의 창을 확인할 수 없습니다."],
  "当前浏览器不支持侧边栏": ["This browser does not support the side panel.", "このブラウザはサイドパネルに対応していません。", "이 브라우저는 사이드 패널을 지원하지 않습니다."],
  "任务无效": ["Invalid task.", "無効なタスクです。", "잘못된 작업입니다."],
  "来源图片无效": ["Invalid source image.", "無効な元画像です。", "잘못된 원본 이미지입니다."],
  "来源图片已切换": ["The source image changed.", "元画像が切り替わりました。", "원본 이미지가 변경되었습니다."],
  "来源图片缓存操作失败": ["The source image cache operation failed.", "元画像キャッシュの操作に失敗しました。", "원본 이미지 캐시 작업에 실패했습니다."],
  "来源图片编码无效，请重新选择图片": ["The source image encoding is invalid. Select the image again.", "元画像のエンコードが無効です。画像を選び直してください。", "원본 이미지 인코딩이 올바르지 않습니다. 이미지를 다시 선택하세요."],
  "当前页面不允许加载网页按钮：{detail}": ["This page does not allow the web button{detail}", "このページではウェブボタンを読み込めません{detail}", "이 페이지에서는 웹 버튼을 불러올 수 없습니다{detail}"],
  "图片尺寸无效": ["Invalid image size.", "画像サイズが無効です。", "이미지 크기가 올바르지 않습니다."],
  "无法创建图片缩放画布": ["Could not create the image scaling canvas.", "画像のリサイズ用キャンバスを作成できません。", "이미지 크기 조정 캔버스를 만들 수 없습니다."],
  "生成接口返回的不是有效图片": ["The generation API did not return a valid image.", "生成APIが有効な画像を返しませんでした。", "생성 API가 유효한 이미지를 반환하지 않았습니다."],
  "随机提示词达到模型输出上限，内容不完整，请重试": ["The random prompt hit the model output limit and is incomplete. Try again.", "ランダムプロンプトがモデルの出力上限に達し、内容が不完全です。再試行してください。", "랜덤 프롬프트가 모델 출력 한도에 도달해 내용이 불완전합니다. 다시 시도하세요."],
  "反推内容达到模型输出上限，回答不完整。请重试，或选择支持更长输出的反推模型": ["Image analysis hit the model output limit and the answer is incomplete. Try again or choose a vision model with a longer output limit.", "画像解析がモデルの出力上限に達し、回答が不完全です。再試行するか、出力上限の大きい解析モデルを選択してください。", "이미지 분석이 모델 출력 한도에 도달해 답변이 불완전합니다. 다시 시도하거나 출력 한도가 더 큰 분석 모델을 선택하세요."],
  "反推内容达到模型输出上限，回答不完整。请重试，或在平台设置中选择支持更长输出的反推模型": ["Image analysis hit the model output limit and the answer is incomplete. Try again, or choose a vision model with a longer output limit in the provider settings.", "画像解析がモデルの出力上限に達し、回答が不完全です。再試行するか、プラットフォーム設定で出力上限の大きい解析モデルを選択してください。", "이미지 분석이 모델 출력 한도에 도달해 답변이 불완전합니다. 다시 시도하거나 플랫폼 설정에서 출력 한도가 더 큰 분석 모델을 선택하세요."],
  "反推接口返回的结构不完整，缺少英文完整复刻提示词，请重试": ["The analysis API returned an incomplete structure without a full English replication prompt. Try again.", "解析APIの構造が不完全で、英語の完全再現プロンプトがありません。再試行してください。", "분석 API 구조가 불완전하여 영어 전체 재현 프롬프트가 없습니다. 다시 시도하세요."],
  "APImart 反推接口返回的结构不完整，缺少英文完整复刻提示词，请重试": ["The APImart analysis API returned an incomplete structure without a full English replication prompt. Try again.", "APImartの解析APIの構造が不完全で、英語の完全再現プロンプトがありません。再試行してください。", "APImart 분석 API 구조가 불완전하여 영어 전체 재현 프롬프트가 없습니다. 다시 시도하세요."],
  "QianwenAI 反推接口返回的结构不完整，缺少英文完整复刻提示词，请重试": ["The QianwenAI analysis API returned an incomplete structure without a full English replication prompt. Try again.", "QianwenAIの解析APIの構造が不完全で、英語の完全再現プロンプトがありません。再試行してください。", "QianwenAI 분석 API 구조가 불완전하여 영어 전체 재현 프롬프트가 없습니다. 다시 시도하세요."],
  "QianwenAI 反推模型未返回随机提示词": ["The QianwenAI vision model returned no random prompt.", "QianwenAIの解析モデルがランダムプロンプトを返しませんでした。", "QianwenAI 분석 모델이 랜덤 프롬프트를 반환하지 않았습니다."],
  "RunningHUB 随机提示词等待超过 5 分钟，请稍后重试或切换其他反推模型": ["Waiting for the RunningHUB random prompt exceeded 5 minutes. Try again later or switch to another vision model.", "RunningHUBのランダムプロンプト待機が5分を超えました。しばらくして再試行するか、別の解析モデルに切り替えてください。", "RunningHUB 랜덤 프롬프트 대기가 5분을 초과했습니다. 잠시 후 다시 시도하거나 다른 분석 모델로 전환하세요."],
  "RunningHUB 反推等待超过 5 分钟，请稍后重试或临时切换其他反推模型": ["Waiting for RunningHUB image analysis exceeded 5 minutes. Try again later or temporarily switch to another vision model.", "RunningHUBの画像解析待機が5分を超えました。しばらくして再試行するか、一時的に別の解析モデルに切り替えてください。", "RunningHUB 이미지 분석 대기가 5분을 초과했습니다. 잠시 후 다시 시도하거나 다른 분석 모델로 잠시 전환하세요."],
  "生图接口返回格式不支持（既无 b64_json 也无 url）": ["Unsupported image API response: neither b64_json nor url was returned.", "サポートされていない画像API応答です（b64_jsonもurlもありません）。", "지원되지 않는 이미지 API 응답입니다(b64_json도 url도 없음)."],
  "下载生成图失败": ["Could not download the generated image.", "生成画像のダウンロードに失敗しました。", "생성 이미지를 다운로드하지 못했습니다."],
  "下载生成结果失败": ["Could not download the generated result.", "生成結果のダウンロードに失敗しました。", "생성 결과를 다운로드하지 못했습니다."],
  "生成结果读取失败 HTTP {status}": ["Could not read the generated result: HTTP {status}", "生成結果の読み込みに失敗しました：HTTP {status}", "생성 결과 읽기 실패: HTTP {status}"],
  "图生图失败：{detail}": ["Image editing failed{detail}", "画像編集に失敗しました{detail}", "이미지 편집 실패{detail}"],
  "缺少需要编辑的原图": ["The original image to edit is missing.", "編集する元画像がありません。", "편집할 원본 이미지가 없습니다."],
  "图生图缺少来源图片": ["Image editing is missing the source image.", "画像編集の元画像がありません。", "이미지 편집에 필요한 원본 이미지가 없습니다."],
  "ZIP 内文件过多，最多支持 {maxEntries} 个": ["Too many files in the ZIP; up to {maxEntries} are supported.", "ZIP内のファイルが多すぎます（最大{maxEntries}件）。", "ZIP 파일이 너무 많습니다(최대 {maxEntries}개)."],
  "ZIP 使用了暂不支持的压缩方式：{method}": ["The ZIP uses an unsupported compression method: {method}", "ZIPが未対応の圧縮方式を使用しています：{method}", "ZIP이 아직 지원하지 않는 압축 방식을 사용합니다: {method}"],
  "ZIP 内文件校验失败：{name}": ["ZIP file verification failed: {name}", "ZIP内ファイルの検証に失敗しました：{name}", "ZIP 파일 검증 실패: {name}"],
  "APImart Gemini 图片必须是 Base64 Data URI": ["APImart Gemini images must be Base64 data URIs.", "APImartのGemini画像はBase64データURIである必要があります。", "APImart Gemini 이미지는 Base64 Data URI여야 합니다."],
  "APImart 的 z-image-turbo 不支持图片编辑，请选择 gpt-image-2 或 gpt-image-2-official": ["APImart z-image-turbo does not support image editing. Choose gpt-image-2 or gpt-image-2-official.", "APImartのz-image-turboは画像編集に対応していません。gpt-image-2またはgpt-image-2-officialを選択してください。", "APImart z-image-turbo는 이미지 편집을 지원하지 않습니다. gpt-image-2 또는 gpt-image-2-official을 선택하세요."],
  "APImart 模型“{name}”不支持图片编辑": ["The APImart model “{name}” does not support image editing.", "APImartモデル「{name}」は画像編集に対応していません。", "APImart 모델 “{name}”은(는) 이미지 편집을 지원하지 않습니다."],
  "APImart 图片上传成功，但未返回图片 URL": ["The APImart upload succeeded but returned no image URL.", "APImartのアップロードは成功しましたが、画像URLが返されませんでした。", "APImart 업로드는 성공했지만 이미지 URL이 반환되지 않았습니다."],
  "APImart 图片上传失败 HTTP {status}{detail}": ["APImart image upload failed: HTTP {status}{detail}", "APImartの画像アップロードに失敗しました：HTTP {status}{detail}", "APImart 이미지 업로드 실패: HTTP {status}{detail}"],
  "APImart 图片上传失败：{detail}": ["APImart image upload failed{detail}", "APImartの画像アップロードに失敗しました{detail}", "APImart 이미지 업로드 실패{detail}"],
  "APImart 生图失败：{detail}": ["APImart image generation failed{detail}", "APImartの画像生成に失敗しました{detail}", "APImart 이미지 생성 실패{detail}"],
  "APImart 生图等待超过 10 分钟，请稍后重试": ["APImart image generation waited over 10 minutes. Try again later.", "APImartの画像生成が10分を超えました。しばらくして再試行してください。", "APImart 이미지 생성이 10분을 초과했습니다. 잠시 후 다시 시도하세요."],
  "APImart 任务已完成，但下载结果图片失败：{detail}": ["The APImart task completed but downloading the result failed{detail}", "APImartのタスクは完了しましたが、結果画像のダウンロードに失敗しました{detail}", "APImart 작업은 완료되었지만 결과 이미지 다운로드 실패{detail}"],
  "APImart 图片编辑缺少需要编辑的原图": ["APImart image editing is missing the original image to edit.", "APImartの画像編集に編集する元画像がありません。", "APImart 이미지 편집에 편집할 원본 이미지가 없습니다."],
  "APImart 获取模型列表失败：{detail}": ["Could not fetch the APImart model list{detail}", "APImartのモデル一覧の取得に失敗しました{detail}", "APImart 모델 목록 가져오기 실패{detail}"],
  "OpenRouter 生图返回格式不支持（既无 b64_json 也无 url）": ["Unsupported OpenRouter response: neither b64_json nor url was returned.", "OpenRouterの応答は未対応です（b64_jsonもurlもありません）。", "지원되지 않는 OpenRouter 응답입니다(b64_json도 url도 없음)."],
  "OpenRouter 图片编辑缺少需要编辑的原图": ["OpenRouter image editing is missing the original image to edit.", "OpenRouterの画像編集に編集する元画像がありません。", "OpenRouter 이미지 편집에 편집할 원본 이미지가 없습니다."],
  "OpenRouter 图片模型目录中未找到“{model}”": ["“{model}” was not found in the OpenRouter image model catalog.", "OpenRouterの画像モデル一覧に「{model}」が見つかりません。", "OpenRouter 이미지 모델 목록에서 “{model}”을(를) 찾을 수 없습니다."],
  "无法确认 OpenRouter 模型能力：{detail}": ["Could not confirm the OpenRouter model capabilities{detail}", "OpenRouterモデルの機能を確認できません{detail}", "OpenRouter 모델 기능을 확인할 수 없습니다{detail}"],
  "当前 OpenRouter 模型未声明支持比例 {value}": ["The current OpenRouter model does not declare support for aspect ratio {value}.", "現在のOpenRouterモデルは比率{value}に対応を宣言していません。", "현재 OpenRouter 모델은 비율 {value} 지원을 선언하지 않았습니다."],
  "当前 OpenRouter 模型不支持比例 {value}": ["The current OpenRouter model does not support aspect ratio {value}.", "現在のOpenRouterモデルは比率{value}に対応していません。", "현재 OpenRouter 모델은 비율 {value}을(를) 지원하지 않습니다."],
  "当前 OpenRouter 模型未声明支持分辨率 {value}": ["The current OpenRouter model does not declare support for resolution {value}.", "現在のOpenRouterモデルは解像度{value}に対応を宣言していません。", "현재 OpenRouter 모델은 해상도 {value} 지원을 선언하지 않았습니다."],
  "当前 OpenRouter 模型不支持分辨率 {value}": ["The current OpenRouter model does not support resolution {value}.", "現在のOpenRouterモデルは解像度{value}に対応していません。", "현재 OpenRouter 모델은 해상도 {value}을(를) 지원하지 않습니다."],
  "OpenRouter 获取模型失败：{detail}": ["Could not fetch OpenRouter models{detail}", "OpenRouterのモデル取得に失敗しました{detail}", "OpenRouter 모델 가져오기 실패{detail}"],
  "fal.ai 模型名称格式不正确，应类似 fal-ai/krea-2/turbo": ["Invalid fal.ai model name; it should look like fal-ai/krea-2/turbo.", "fal.aiのモデル名の形式が正しくありません（例：fal-ai/krea-2/turbo）。", "fal.ai 모델 이름 형식이 올바르지 않습니다(예: fal-ai/krea-2/turbo)."],
  "fal.ai Base URL 格式不正确": ["Invalid fal.ai Base URL format.", "fal.aiのBase URLの形式が正しくありません。", "fal.ai Base URL 형식이 올바르지 않습니다."],
  "fal.ai 原生适配器的 Base URL 必须是 https://queue.fal.run": ["The fal.ai native adapter requires the Base URL https://queue.fal.run.", "fal.aiネイティブアダプターのBase URLはhttps://queue.fal.runである必要があります。", "fal.ai 네이티브 어댑터의 Base URL은 https://queue.fal.run이어야 합니다."],
  "fal.ai 返回了无效的队列地址": ["fal.ai returned an invalid queue URL.", "fal.aiが無効なキューURLを返しました。", "fal.ai가 잘못된 큐 주소를 반환했습니다."],
  "fal.ai 返回了不受信任的队列地址，已停止发送 API Key": ["fal.ai returned an untrusted queue URL, so the API key was not sent.", "fal.aiが信頼できないキューURLを返したため、APIキーの送信を中止しました。", "fal.ai가 신뢰할 수 없는 큐 주소를 반환하여 API 키 전송을 중단했습니다."],
  "fal.ai 返回的内容不是有效 JSON": ["The fal.ai response is not valid JSON.", "fal.aiの応答が有効なJSONではありません。", "fal.ai 응답이 유효한 JSON이 아닙니다."],
  "fal.ai 网络请求失败：{detail}": ["fal.ai network request failed{detail}", "fal.aiのネットワークリクエストに失敗しました{detail}", "fal.ai 네트워크 요청 실패{detail}"],
  "fal.ai 图片编辑缺少来源图片": ["fal.ai image editing is missing the source image.", "fal.aiの画像編集に元画像がありません。", "fal.ai 이미지 편집에 원본 이미지가 없습니다."],
  "当前 fal.ai image-to-image 模型只接受 1 张来源图，不能同时提交角色/物品参考图": ["The current fal.ai image-to-image model accepts only one source image and cannot take an extra character/object reference.", "現在のfal.ai image-to-imageモデルは元画像1枚のみ対応しており、人物/アイテムの参照画像を同時に送信できません。", "현재 fal.ai image-to-image 모델은 원본 이미지 1장만 허용하여 인물/사물 참조 이미지를 함께 보낼 수 없습니다."],
  "fal.ai 生成失败：{detail}": ["fal.ai generation failed{detail}", "fal.aiの生成に失敗しました{detail}", "fal.ai 생성 실패{detail}"],
  "fal.ai 模型目录返回的内容不是有效 JSON": ["The fal.ai model catalog response is not valid JSON.", "fal.aiのモデル一覧の応答が有効なJSONではありません。", "fal.ai 모델 목록 응답이 유효한 JSON이 아닙니다."],
  "fal.ai 模型目录请求超时": ["The fal.ai model catalog request timed out.", "fal.aiのモデル一覧リクエストがタイムアウトしました。", "fal.ai 모델 목록 요청 시간이 초과되었습니다."],
  "fal.ai 官方目录未返回可用的图片模型": ["The official fal.ai catalog returned no usable image models.", "fal.aiの公式一覧に利用可能な画像モデルがありません。", "fal.ai 공식 목록에 사용 가능한 이미지 모델이 없습니다."],
  "fal.ai 模型目录 HTTP {status}": ["fal.ai model catalog: HTTP {status}", "fal.aiのモデル一覧：HTTP {status}", "fal.ai 모델 목록: HTTP {status}"],
  "fal.ai 接口错误 HTTP {status}{detail}": ["fal.ai API error HTTP {status}{detail}", "fal.ai APIエラー：HTTP {status}{detail}", "fal.ai API 오류: HTTP {status}{detail}"],
  "fal.ai 模型「{model}」的图片编辑参数格式尚未适配；请使用已内置适配的编辑模型，避免提交不兼容参数": ["The image editing parameters for the fal.ai model “{model}” are not adapted yet. Use a built-in supported editing model to avoid incompatible parameters.", "fal.aiモデル「{model}」の画像編集パラメータは未対応です。互換性のないパラメータを送信しないよう、内蔵対応の編集モデルを使用してください。", "fal.ai 모델 “{model}”의 이미지 편집 매개변수는 아직 지원되지 않습니다. 호환되지 않는 매개변수를 보내지 않도록 내장 지원 편집 모델을 사용하세요."],
  "AtlasCloud 图片编辑缺少来源图片": ["AtlasCloud image editing is missing the source image.", "AtlasCloudの画像編集に元画像がありません。", "AtlasCloud 이미지 편집에 원본 이미지가 없습니다."],
  "AtlasCloud 图片上传失败：{detail}": ["AtlasCloud image upload failed{detail}", "AtlasCloudの画像アップロードに失敗しました{detail}", "AtlasCloud 이미지 업로드 실패{detail}"],
  "AtlasCloud 图片上传失败 HTTP {status}{detail}": ["AtlasCloud image upload failed: HTTP {status}{detail}", "AtlasCloudの画像アップロードに失敗しました：HTTP {status}{detail}", "AtlasCloud 이미지 업로드 실패: HTTP {status}{detail}"],
  "AtlasCloud 提交失败：{detail}": ["AtlasCloud submission failed{detail}", "AtlasCloudの送信に失敗しました{detail}", "AtlasCloud 제출 실패{detail}"],
  "AtlasCloud 未返回 prediction ID": ["AtlasCloud returned no prediction ID.", "AtlasCloudがprediction IDを返しませんでした。", "AtlasCloud가 prediction ID를 반환하지 않았습니다."],
  "AtlasCloud 生图失败：{detail}": ["AtlasCloud image generation failed{detail}", "AtlasCloudの画像生成に失敗しました{detail}", "AtlasCloud 이미지 생성 실패{detail}"],
  "AtlasCloud 生图等待超过 10 分钟，请稍后重试": ["AtlasCloud image generation waited over 10 minutes. Try again later.", "AtlasCloudの画像生成が10分を超えました。しばらくして再試行してください。", "AtlasCloud 이미지 생성이 10분을 초과했습니다. 잠시 후 다시 시도하세요."],
  "AtlasCloud 任务已完成，但下载结果图片失败（已重试 {count} 次）：{detail}": ["The AtlasCloud task completed but downloading the result failed (after {count} retries){detail}", "AtlasCloudのタスクは完了しましたが、結果画像のダウンロードに失敗しました（{count}回再試行）{detail}", "AtlasCloud 작업은 완료되었지만 결과 이미지 다운로드 실패({count}회 재시도){detail}"],
  "AtlasCloud 图片编辑缺少需要编辑的原图": ["AtlasCloud image editing is missing the original image to edit.", "AtlasCloudの画像編集に編集する元画像がありません。", "AtlasCloud 이미지 편집에 편집할 원본 이미지가 없습니다."],
  "Atlas Cloud 的两个 Chat Completions 路由均返回 404。模型“{model}”可能不支持图片输入，请改用支持视觉理解的聊天模型，而不是生图模型。": ["Both Atlas Cloud Chat Completions routes returned 404. The model “{model}” may not accept image input; use a vision-capable chat model instead of an image generation model.", "Atlas Cloudの2つのChat Completionsルートがともに404を返しました。モデル「{model}」は画像入力に対応していない可能性があります。画像生成モデルではなく視覚対応のチャットモデルを使用してください。", "Atlas Cloud의 두 Chat Completions 경로가 모두 404를 반환했습니다. 모델 “{model}”이(가) 이미지 입력을 지원하지 않을 수 있습니다. 이미지 생성 모델 대신 비전 지원 채팅 모델을 사용하세요."],
  "ModelScope 任务成功，但未返回 output_images": ["The ModelScope task succeeded but returned no output_images.", "ModelScopeのタスクは成功しましたが、output_imagesが返されませんでした。", "ModelScope 작업은 성공했지만 output_images가 반환되지 않았습니다."],
  "ModelScope 图生图缺少需要编辑的原图": ["ModelScope image editing is missing the original image to edit.", "ModelScopeの画像編集に編集する元画像がありません。", "ModelScope 이미지 편집에 편집할 원본 이미지가 없습니다."],
  "ModelScope {task}接口未返回 task_id": ["The ModelScope {task} API returned no task_id.", "ModelScopeの{task}APIがtask_idを返しませんでした。", "ModelScope {task} API가 task_id를 반환하지 않았습니다."],
  "ModelScope {task}失败：{detail}": ["ModelScope {task} failed{detail}", "ModelScopeの{task}に失敗しました{detail}", "ModelScope {task} 실패{detail}"],
  "ModelScope {task}等待超过 5 分钟，请稍后重试": ["ModelScope {task} waited over 5 minutes. Try again later.", "ModelScopeの{task}が5分を超えました。しばらくして再試行してください。", "ModelScope {task} 대기가 5분을 초과했습니다. 잠시 후 다시 시도하세요."],
  "ZenMux 图生图失败：{detail}": ["ZenMux image editing failed{detail}", "ZenMuxの画像編集に失敗しました{detail}", "ZenMux 이미지 편집 실패{detail}"],
  "ZenMux 图生图接口返回 HTTP 404；已尝试模型 {models} 及 JSON/multipart 两种官方格式{detail}": ["The ZenMux image editing API returned HTTP 404 after trying model(s) {models} in both JSON and multipart formats{detail}", "ZenMuxの画像編集APIがHTTP 404を返しました。モデル{models}とJSON/multipartの両形式を試しました{detail}", "ZenMux 이미지 편집 API가 HTTP 404를 반환했습니다. 모델 {models}과(와) JSON/multipart 두 형식을 시도했습니다{detail}"],
  "QianwenAI 图片编辑缺少需要编辑的原图": ["QianwenAI image editing is missing the original image to edit.", "QianwenAIの画像編集に編集する元画像がありません。", "QianwenAI 이미지 편집에 편집할 원본 이미지가 없습니다."],
  "QianwenAI 已生成图片，但下载结果失败：{detail}": ["QianwenAI generated the image but downloading it failed{detail}", "QianwenAIは画像を生成しましたが、ダウンロードに失敗しました{detail}", "QianwenAI가 이미지를 생성했지만 다운로드 실패{detail}"],
  "QianwenAI 接口未返回文本{detail}": ["The QianwenAI API returned no text{detail}", "QianwenAI APIがテキストを返しませんでした{detail}", "QianwenAI API가 텍스트를 반환하지 않았습니다{detail}"],
  "QianwenAI 生图未返回图片{detail}": ["QianwenAI image generation returned no image{detail}", "QianwenAIの画像生成が画像を返しませんでした{detail}", "QianwenAI 이미지 생성이 이미지를 반환하지 않았습니다{detail}"],
  "Aliyun Token Plan 图片编辑缺少需要编辑的原图": ["Aliyun Token Plan image editing is missing the original image to edit.", "Aliyun Token Planの画像編集に編集する元画像がありません。", "Aliyun Token Plan 이미지 편집에 편집할 원본 이미지가 없습니다."],
  "Aliyun Token Plan 参考图尺寸处理失败：{detail}": ["Aliyun Token Plan reference image resizing failed{detail}", "Aliyun Token Planの参照画像サイズ処理に失敗しました{detail}", "Aliyun Token Plan 참조 이미지 크기 처리 실패{detail}"],
  "Aliyun Token Plan 已生成图片，但下载结果失败：{detail}": ["Aliyun Token Plan generated the image but downloading it failed{detail}", "Aliyun Token Planは画像を生成しましたが、ダウンロードに失敗しました{detail}", "Aliyun Token Plan이 이미지를 생성했지만 다운로드 실패{detail}"],
  "Aliyun Token Plan 生图未返回图片{detail}": ["Aliyun Token Plan image generation returned no image{detail}", "Aliyun Token Planの画像生成が画像を返しませんでした{detail}", "Aliyun Token Plan 이미지 생성이 이미지를 반환하지 않았습니다{detail}"],
  "该 RunningHUB 模型需要来源图片，请先点击网页图片上的魔法按钮": ["This RunningHUB model needs a source image. Click the magic button on a web image first.", "このRunningHUBモデルには元画像が必要です。先にウェブ画像のマジックボタンをクリックしてください。", "이 RunningHUB 모델은 원본 이미지가 필요합니다. 먼저 웹 이미지의 매직 버튼을 클릭하세요."],
  "RunningHUB 模型缺少必填参数：{detail}": ["The RunningHUB model is missing a required parameter{detail}", "RunningHUBモデルの必須パラメータがありません{detail}", "RunningHUB 모델에 필수 매개변수가 없습니다{detail}"],
  "读取 RunningHUB AI 应用失败：{detail}": ["Could not read the RunningHUB AI app{detail}", "RunningHUB AIアプリの取得に失敗しました{detail}", "RunningHUB AI 앱 읽기 실패{detail}"],
  "RunningHUB AI 应用提交失败：{detail}": ["Submitting the RunningHUB AI app failed{detail}", "RunningHUB AIアプリの送信に失敗しました{detail}", "RunningHUB AI 앱 제출 실패{detail}"],
  "RunningHUB AI 应用生成失败：{detail}": ["RunningHUB AI app generation failed{detail}", "RunningHUB AIアプリの生成に失敗しました{detail}", "RunningHUB AI 앱 생성 실패{detail}"],
  "RunningHUB 工作流返回的 ZIP 中没有可用图片": ["The ZIP returned by the RunningHUB workflow contains no usable images.", "RunningHUBワークフローが返したZIPに利用可能な画像がありません。", "RunningHUB 워크플로가 반환한 ZIP에 사용 가능한 이미지가 없습니다."],
  "RunningHUB 工作流返回的 ZIP 中没有可解码图片": ["The ZIP returned by the RunningHUB workflow contains no decodable images.", "RunningHUBワークフローが返したZIPにデコード可能な画像がありません。", "RunningHUB 워크플로가 반환한 ZIP에 디코딩 가능한 이미지가 없습니다."],
  "RunningHUB 工作流 JSON 无法解析": ["The RunningHUB workflow JSON could not be parsed.", "RunningHUBワークフローのJSONを解析できません。", "RunningHUB 워크플로 JSON을 구문 분석할 수 없습니다."],
  "RunningHUB 工作流 JSON 格式不正确": ["The RunningHUB workflow JSON format is invalid.", "RunningHUBワークフローのJSON形式が正しくありません。", "RunningHUB 워크플로 JSON 형식이 올바르지 않습니다."],
  "未能在 RunningHUB 工作流中找到可修改的正向提示词节点": ["Could not find an editable positive prompt node in the RunningHUB workflow.", "RunningHUBワークフローに編集可能なポジティブプロンプトノードが見つかりません。", "RunningHUB 워크플로에서 편집 가능한 긍정 프롬프트 노드를 찾을 수 없습니다."],
  "未能在 RunningHUB API 工作流中唯一确定提示词节点": ["Could not identify a unique prompt node in the RunningHUB API workflow.", "RunningHUB APIワークフローでプロンプトノードを一意に特定できません。", "RunningHUB API 워크플로에서 프롬프트 노드를 하나로 특정할 수 없습니다."],
  "RunningHUB 工作流节点 {node}（{description}）没有可确定的输入字段；现有字段：{fields}。请检查或重新导出工作流 API JSON": ["Workflow node {node} ({description}) has no determinable input field; existing fields: {fields}. Check the workflow or re-export its API JSON.", "ワークフローノード{node}（{description}）に入力フィールドを特定できません。既存フィールド：{fields}。ワークフローを確認するか、API JSONを再エクスポートしてください。", "워크플로 노드 {node}({description})에서 입력 필드를 특정할 수 없습니다. 기존 필드: {fields}. 워크플로를 확인하거나 API JSON을 다시 내보내세요."],
  "RunningHUB 工作流节点字段与平台当前定义不一致：{detail}。请在 RunningHUB 重新导出该工作流的 API JSON，核对报错节点的 inputs": ["The workflow node fields do not match the platform's current definition{detail}. Re-export the workflow's API JSON in RunningHUB and check the failing node's inputs.", "ワークフローノードのフィールドがプラットフォームの現在の定義と一致しません{detail}。RunningHUBでワークフローのAPI JSONを再エクスポートし、エラーの出たノードのinputsを確認してください。", "워크플로 노드 필드가 플랫폼의 현재 정의와 일치하지 않습니다{detail}. RunningHUB에서 워크플로의 API JSON을 다시 내보내고 오류 노드의 inputs를 확인하세요."],
  "RunningHUB 来源图片上传失败：{detail}": ["RunningHUB source image upload failed{detail}", "RunningHUBの元画像アップロードに失敗しました{detail}", "RunningHUB 원본 이미지 업로드 실패{detail}"],
  "RunningHUB 提交失败：{detail}": ["RunningHUB submission failed{detail}", "RunningHUBの送信に失敗しました{detail}", "RunningHUB 제출 실패{detail}"],
  "RunningHUB 生成失败：{detail}": ["RunningHUB generation failed{detail}", "RunningHUBの生成に失敗しました{detail}", "RunningHUB 생성 실패{detail}"],
  "RunningHUB 查询结果暂时失败：{error}。任务可能仍在平台运行，请稍后到 RunningHUB 查看": ["Temporarily could not query RunningHUB: {error}. The task may still be running; check RunningHUB later.", "RunningHUBの照会が一時的に失敗しました：{error}。タスクはまだ実行中の可能性があります。後ほどRunningHUBで確認してください。", "RunningHUB 조회가 일시적으로 실패했습니다: {error}. 작업이 아직 실행 중일 수 있으니 나중에 RunningHUB에서 확인하세요."],
  "RunningHUB 工作流查询结果暂时失败：{error}。任务可能仍在平台运行，请稍后到 RunningHUB 查看": ["Temporarily could not query the RunningHUB workflow: {error}. The task may still be running; check RunningHUB later.", "RunningHUBワークフローの照会が一時的に失敗しました：{error}。タスクはまだ実行中の可能性があります。後ほどRunningHUBで確認してください。", "RunningHUB 워크플로 조회가 일시적으로 실패했습니다: {error}. 작업이 아직 실행 중일 수 있으니 나중에 RunningHUB에서 확인하세요."],
  "RunningHUB AI 应用查询暂时失败：{error}。任务可能仍在平台运行，请稍后到 RunningHUB 查看": ["Temporarily could not query the RunningHUB AI app: {error}. The task may still be running; check RunningHUB later.", "RunningHUB AIアプリの照会が一時的に失敗しました：{error}。タスクはまだ実行中の可能性があります。後ほどRunningHUBで確認してください。", "RunningHUB AI 앱 조회가 일시적으로 실패했습니다: {error}. 작업이 아직 실행 중일 수 있으니 나중에 RunningHUB에서 확인하세요."],
  "下载 RunningHUB 生成图失败：{detail}": ["Could not download the RunningHUB image{detail}", "RunningHUBの生成画像のダウンロードに失敗しました{detail}", "RunningHUB 생성 이미지 다운로드 실패{detail}"],
  "RunningHUB 工作流模型名应为 workflow/工作流ID": ["The RunningHUB workflow model name should be workflow/<workflow ID>.", "RunningHUBワークフローのモデル名は workflow/ワークフローID の形式にしてください。", "RunningHUB 워크플로 모델 이름은 workflow/워크플로ID 형식이어야 합니다."],
  "读取 RunningHUB 工作流节点失败：{detail}": ["Could not read the RunningHUB workflow nodes{detail}", "RunningHUBワークフローノードの取得に失敗しました{detail}", "RunningHUB 워크플로 노드 읽기 실패{detail}"],
  "RunningHUB 工作流提交失败：{detail}": ["RunningHUB workflow submission failed{detail}", "RunningHUBワークフローの送信に失敗しました{detail}", "RunningHUB 워크플로 제출 실패{detail}"],
  "RunningHUB 工作流未返回 taskId": ["The RunningHUB workflow returned no taskId.", "RunningHUBワークフローがtaskIdを返しませんでした。", "RunningHUB 워크플로가 taskId를 반환하지 않았습니다."],
  "RunningHUB 工作流生成失败：{detail}": ["RunningHUB workflow generation failed{detail}", "RunningHUBワークフローの生成に失敗しました{detail}", "RunningHUB 워크플로 생성 실패{detail}"],
  "RunningHUB 工作流生成等待超过 10 分钟，请稍后重试": ["RunningHUB workflow generation waited over 10 minutes. Try again later.", "RunningHUBワークフローの生成が10分を超えました。しばらくして再試行してください。", "RunningHUB 워크플로 생성이 10분을 초과했습니다. 잠시 후 다시 시도하세요."],
  "下载 RunningHUB 工作流生成图失败：{detail}": ["Could not download the RunningHUB workflow image{detail}", "RunningHUBワークフローの生成画像のダウンロードに失敗しました{detail}", "RunningHUB 워크플로 생성 이미지 다운로드 실패{detail}"],
  "RunningHUB 获取模型失败：{detail}": ["Could not fetch RunningHUB models{detail}", "RunningHUBのモデル取得に失敗しました{detail}", "RunningHUB 모델 가져오기 실패{detail}"],
  "RunningHUB 官方目录未返回可用的视觉或生图模型": ["The official RunningHUB catalog returned no usable vision or image models.", "RunningHUBの公式一覧に利用可能な解析・画像生成モデルがありません。", "RunningHUB 공식 목록에 사용 가능한 분석 또는 이미지 생성 모델이 없습니다."],
  "第 {index} 张失败：{detail}": ["Image {index} failed{detail}", "{index}枚目に失敗しました{detail}", "{index}번째 이미지 실패{detail}"],
  "模型列表接口返回的内容不是有效 JSON（可能是网页），请检查 Base URL 或选择对应的内置接口模板": ["The model list API did not return valid JSON (it may be an HTML page). Check the Base URL or choose the matching built-in provider template.", "モデル一覧APIが有効なJSONを返しませんでした（HTMLページの可能性）。Base URLを確認するか、対応する内蔵テンプレートを選択してください。", "모델 목록 API가 유효한 JSON을 반환하지 않았습니다(HTML 페이지일 수 있음). Base URL을 확인하거나 해당 내장 템플릿을 선택하세요."],
  "请先填写 API Key": ["Enter an API key first.", "先にAPIキーを入力してください。", "먼저 API 키를 입력하세요."],
  "返回的内容不是有效 JSON": ["The response is not valid JSON.", "応答が有効なJSONではありません。", "응답이 유효한 JSON이 아닙니다."],
  "相册数据库正被其他页面占用，请关闭其他相册或设置页面后重试": ["The gallery database is in use by another page. Close other gallery or settings pages and try again.", "アルバムデータベースが他のページで使用中です。他のアルバムや設定ページを閉じて再試行してください。", "앨범 데이터베이스가 다른 페이지에서 사용 중입니다. 다른 앨범이나 설정 페이지를 닫고 다시 시도하세요."],
  "备份清单超过 1 MiB，未提交备份，请缩短提示词或元数据后重试": ["The backup manifest exceeds 1 MiB and was not submitted. Shorten the prompt or metadata and try again.", "バックアップマニフェストが1 MiBを超えたため送信しませんでした。プロンプトやメタデータを短くして再試行してください。", "백업 매니페스트가 1 MiB를 초과하여 제출하지 않았습니다. 프롬프트나 메타데이터를 줄인 후 다시 시도하세요."],
  "备份设置读取失败": ["Could not read the backup settings.", "バックアップ設定の読み込みに失敗しました。", "백업 설정을 읽지 못했습니다."],
  "尚未选择备份目录": ["No backup folder has been chosen yet.", "バックアップフォルダーが未選択です。", "백업 폴더가 아직 선택되지 않았습니다."],
  "备份目录需要重新授权": ["The backup folder needs to be authorized again.", "バックアップフォルダーの再承認が必要です。", "백업 폴더를 다시 승인해야 합니다."],
  "备份目录需要重新授权，请打开设置选择目录": ["The backup folder needs to be authorized again. Open settings and choose the folder.", "バックアップフォルダーの再承認が必要です。設定を開いてフォルダーを選択してください。", "백업 폴더를 다시 승인해야 합니다. 설정을 열어 폴더를 선택하세요."],
  "图片记录时间无效": ["The image record timestamp is invalid.", "画像レコードの日時が無効です。", "이미지 레코드 시간이 올바르지 않습니다."],
  "角色素材时间无效": ["The character asset timestamp is invalid.", "人物素材の日時が無効です。", "인물 소재 시간이 올바르지 않습니다."],
  "角色素材图片无效": ["Invalid character asset image.", "人物素材の画像が無効です。", "인물 소재 이미지가 올바르지 않습니다."],
  "图片备份路径无效": ["Invalid image backup path.", "画像バックアップのパスが無効です。", "이미지 백업 경로가 올바르지 않습니다."],
  "原图备份路径无效": ["Invalid original-image backup path.", "元画像バックアップのパスが無効です。", "원본 이미지 백업 경로가 올바르지 않습니다."],
  "缺少恢复清单": ["Missing restore manifest.", "復元マニフェストがありません。", "복원 매니페스트가 없습니다."],
  "EchoShot 图片元数据编码无效": ["Invalid EchoShot image metadata encoding.", "EchoShot画像メタデータのエンコードが無効です。", "EchoShot 이미지 메타데이터 인코딩이 올바르지 않습니다."],
  "EchoShot 图片元数据无效": ["Invalid EchoShot image metadata.", "EchoShot画像メタデータが無効です。", "EchoShot 이미지 메타데이터가 올바르지 않습니다."],
  "EchoShot 图片元数据过大": ["EchoShot image metadata is too large.", "EchoShot画像メタデータが大きすぎます。", "EchoShot 이미지 메타데이터가 너무 큽니다."],
  "EchoShot JPEG 元数据过大": ["EchoShot JPEG metadata is too large.", "EchoShotのJPEGメタデータが大きすぎます。", "EchoShot JPEG 메타데이터가 너무 큽니다."],
  "不是有效的 PNG 图片": ["Not a valid PNG image.", "有効なPNG画像ではありません。", "유효한 PNG 이미지가 아닙니다."],
  "PNG 图片结构损坏或不完整": ["The PNG image is corrupted or incomplete.", "PNG画像の構造が破損しているか不完全です。", "PNG 이미지 구조가 손상되었거나 불완전합니다."],
  "PNG 图片缺少 IEND": ["The PNG image is missing IEND.", "PNG画像にIENDがありません。", "PNG 이미지에 IEND가 없습니다."],
  "不是有效的 JPEG 图片": ["Not a valid JPEG image.", "有効なJPEG画像ではありません。", "유효한 JPEG 이미지가 아닙니다."],
  "不是有效的 WebP 图片": ["Not a valid WebP image.", "有効なWebP画像ではありません。", "유효한 WebP 이미지가 아닙니다."],
  "WebP 图片结构损坏或不完整": ["The WebP image is corrupted or incomplete.", "WebP画像の構造が破損しているか不完全です。", "WebP 이미지 구조가 손상되었거나 불완전합니다."],
  "无法读取 WebP 图片尺寸": ["Could not read the WebP image dimensions.", "WebP画像のサイズを読み取れません。", "WebP 이미지 크기를 읽을 수 없습니다."],
  "不是有效的 GIF 图片": ["Not a valid GIF image.", "有効なGIF画像ではありません。", "유효한 GIF 이미지가 아닙니다."],
  "不是有效的 SVG 图片": ["Not a valid SVG image.", "有効なSVG画像ではありません。", "유효한 SVG 이미지가 아닙니다."],
  "需要图片 Blob": ["An image Blob is required.", "画像Blobが必要です。", "이미지 Blob이 필요합니다."],
  "图片超过 128 MiB，已停止读取元数据": ["The image exceeds 128 MiB; stopped reading metadata.", "画像が128 MiBを超えているため、メタデータの読み取りを停止しました。", "이미지가 128 MiB를 초과하여 메타데이터 읽기를 중지했습니다."],
  "ZIP 文件结构损坏或不完整": ["The ZIP file is corrupted or incomplete.", "ZIPファイルの構造が破損しているか不完全です。", "ZIP 파일 구조가 손상되었거나 불완전합니다."],
  "不是有效的 ZIP 文件": ["Not a valid ZIP file.", "有効なZIPファイルではありません。", "유효한 ZIP 파일이 아닙니다."],
  "当前浏览器不支持解压 ZIP 中的压缩文件": ["This browser cannot decompress compressed ZIP entries.", "このブラウザはZIP内の圧縮ファイルの展開に対応していません。", "이 브라우저는 ZIP 내 압축 파일 해제를 지원하지 않습니다."],
  "ZIP 内文件实际解压体积过大，已停止解压": ["A file in the ZIP expands too large; stopped extracting.", "ZIP内ファイルの展開後サイズが大きすぎるため、展開を停止しました。", "ZIP 내 파일의 압축 해제 크기가 너무 커서 해제를 중지했습니다."],
  "ZIP 文件解压失败": ["Could not extract the ZIP file.", "ZIPファイルの展開に失敗しました。", "ZIP 파일 압축 해제에 실패했습니다."],
  "ZIP 压缩包体积过大，已停止读取": ["The ZIP archive is too large; stopped reading.", "ZIPアーカイブが大きすぎるため、読み取りを停止しました。", "ZIP 압축 파일이 너무 커서 읽기를 중지했습니다."],
  "暂不支持分卷 ZIP 文件": ["Split ZIP files are not supported yet.", "分割ZIPファイルはまだ対応していません。", "분할 ZIP 파일은 아직 지원하지 않습니다."],
  "暂不支持 ZIP64 文件": ["ZIP64 files are not supported yet.", "ZIP64ファイルはまだ対応していません。", "ZIP64 파일은 아직 지원하지 않습니다."],
  "ZIP 内文件已加密，无法解压": ["A file in the ZIP is encrypted and cannot be extracted.", "ZIP内ファイルが暗号化されているため展開できません。", "ZIP 내 파일이 암호화되어 압축을 해제할 수 없습니다."],
  "ZIP 内单个文件过大，已停止解压": ["A single file in the ZIP is too large; stopped extracting.", "ZIP内の単一ファイルが大きすぎるため、展開を停止しました。", "ZIP 내 단일 파일이 너무 커서 해제를 중지했습니다."],
  "ZIP 解压后体积过大，已停止解压": ["The extracted ZIP is too large; stopped extracting.", "ZIPの展開後サイズが大きすぎるため、展開を停止しました。", "ZIP 압축 해제 크기가 너무 커서 해제를 중지했습니다."],
  "ZIP 实际解压总体积过大，已停止解压": ["The actual extracted ZIP size is too large; stopped extracting.", "ZIPの実際の展開後サイズが大きすぎるため、展開を停止しました。", "ZIP 실제 압축 해제 총 크기가 너무 커서 해제를 중지했습니다."],
  "ZIP 内文件实际体积过大，已停止解压": ["An actual decompressed file in the ZIP is too large; stopped extracting.", "ZIP内ファイルの実際のサイズが大きすぎるため、展開を停止しました。", "ZIP 내 파일의 실제 크기가 너무 커서 해제를 중지했습니다."],
  "APImart {action}失败：{detail}": ["APImart {action} failed{detail}", "APImartの{action}に失敗しました{detail}", "APImart {action} 실패{detail}"],
  "图片编辑仅允许通过“替换角色或物品”功能发起": ["Image editing can only be started from “Replace Character or Object”.", "画像編集は「人物またはアイテムを置換」から開始してください。", "이미지 편집은 '인물 또는 사물 교체'에서만 시작할 수 있습니다."],
  "未知消息类型": ["Unknown message type.", "不明なメッセージ種別です。", "알 수 없는 메시지 유형입니다."],
  "请先阅读并同意隐私说明": ["Read and accept the privacy notice first.", "先にプライバシー説明を読み、同意してください。", "먼저 개인정보 안내를 읽고 동의하세요."],
  "没有可用的来源图片": ["No source image is available.", "利用できる元画像がありません。", "사용할 수 있는 원본 이미지가 없습니다."],
  "提示词为空": ["The prompt is empty.", "プロンプトが空です。", "프롬프트가 비어 있습니다."],
  "编辑说明为空": ["The edit instructions are empty.", "編集の指示が空です。", "편집 지시가 비어 있습니다."],
  "图生图模型配置不完整": ["The image editing model configuration is incomplete.", "画像編集モデルの設定が不完全です。", "이미지 편집 모델 설정이 불완전합니다."],
  "请选择 fal.ai 的图片编辑或 image-to-image 模型": ["Choose a fal.ai image editing or image-to-image model.", "fal.aiの画像編集またはimage-to-imageモデルを選択してください。", "fal.ai 이미지 편집 또는 image-to-image 모델을 선택하세요."],
  "请选择 APImart 的 gpt-image-2 或 gpt-image-2-official 图片编辑模型": ["Choose the APImart gpt-image-2 or gpt-image-2-official image editing model.", "APImartのgpt-image-2またはgpt-image-2-official画像編集モデルを選択してください。", "APImart gpt-image-2 또는 gpt-image-2-official 이미지 편집 모델을 선택하세요."],
  "请选择 AtlasCloud 的 Nano Banana 编辑模型或 openai/gpt-image-2/edit 模型": ["Choose an AtlasCloud Nano Banana editing model or openai/gpt-image-2/edit.", "AtlasCloudのNano Banana編集モデルまたはopenai/gpt-image-2/editを選択してください。", "AtlasCloud Nano Banana 편집 모델 또는 openai/gpt-image-2/edit를 선택하세요."],
  "请选择 RunningHUB 的 image-to-image 或 edit 模型": ["Choose a RunningHUB image-to-image or edit model.", "RunningHUBのimage-to-imageまたはeditモデルを選択してください。", "RunningHUB image-to-image 또는 edit 모델을 선택하세요."],
  "当前 RunningHUB 工作流不支持角色替换，请选择图生图或 edit 模型": ["The current RunningHUB workflow does not support subject replacement. Choose an image-to-image or edit model.", "現在のRunningHUBワークフローは人物・アイテムの置換に対応していません。image-to-imageまたはeditモデルを選択してください。", "현재 RunningHUB 워크플로는 인물/사물 교체를 지원하지 않습니다. image-to-image 또는 edit 모델을 선택하세요."],
  "请选择 ModelScope 的 Qwen-Image-Edit 图生图模型": ["Choose the ModelScope Qwen-Image-Edit model.", "ModelScopeのQwen-Image-Editモデルを選択してください。", "ModelScope Qwen-Image-Edit 모델을 선택하세요."],
  "当前窗口已有后台任务进行中，请等待完成": ["A background task is already running in this window. Wait for it to finish.", "このウィンドウではバックグラウンドタスクが実行中です。完了までお待ちください。", "이 창에서 이미 백그라운드 작업이 실행 중입니다. 완료될 때까지 기다리세요."],
  "浏览器后台惊喜提示词任务曾意外中断，请重新生成": ["The background surprise-prompt task was interrupted. Generate it again.", "バックグラウンドのサプライズプロンプト処理が中断されました。もう一度生成してください。", "백그라운드 서프라이즈 프롬프트 작업이 중단되었습니다. 다시 생성하세요."],
  "图片读取因浏览器后台中断，请重新点击魔法按钮或重新截图": ["Reading the image was interrupted when the browser background stopped. Click the magic button again or capture the area again.", "ブラウザのバックグラウンド停止により画像の読み込みが中断されました。マジックボタンを再度クリックするか、範囲を撮り直してください。", "브라우저 백그라운드가 중단되어 이미지 읽기가 중단되었습니다. 매직 버튼을 다시 클릭하거나 영역을 다시 캡처하세요."],
  "浏览器后台生图任务曾意外中断；已经生成的图片仍保留在相册中，请重新发起任务": ["The background image generation task was interrupted; images already generated remain in the gallery. Start the task again.", "バックグラウンドの画像生成処理が中断されました。生成済みの画像はアルバムに残っています。もう一度タスクを開始してください。", "백그라운드 이미지 생성 작업이 중단되었습니다. 이미 생성된 이미지는 앨범에 남아 있습니다. 작업을 다시 시작하세요."],
  "浏览器后台任务曾意外中断；已经生成的图片仍保留在相册中，请重新发起剩余任务": ["The background task was interrupted; images already generated remain in the gallery. Start the remaining work again.", "バックグラウンド処理が中断されました。生成済みの画像はアルバムに残っています。残りのタスクを再開してください。", "백그라운드 작업이 중단되었습니다. 이미 생성된 이미지는 앨범에 남아 있습니다. 남은 작업을 다시 시작하세요."],
  "图片文件为空或超过 256 MiB": ["The image file is empty or larger than 256 MiB.", "画像ファイルが空か、256 MiBを超えています。", "이미지 파일이 비어 있거나 256 MiB를 초과합니다."],
  "完整性信息无效": ["The integrity information is invalid.", "整合性情報が無効です。", "무결성 정보가 올바르지 않습니다."],
  "文件大小不匹配": ["The file size does not match.", "ファイルサイズが一致しません。", "파일 크기가 일치하지 않습니다."],
  "SHA-256 不匹配": ["SHA-256 does not match.", "SHA-256が一致しません。", "SHA-256이 일치하지 않습니다."],
  "超过 {size}": ["exceeds {size}", "{size}を超えています", "{size}을(를) 초과합니다"],
  "不是有效 JSON": ["is not valid JSON", "が有効なJSONではありません", "이(가) 유효한 JSON이 아닙니다"],
  "不是受支持的 EchoShot 备份清单": ["is not a supported EchoShot backup manifest", "は対応していないEchoShotバックアップマニフェストです", "은(는) 지원되지 않는 EchoShot 백업 매니페스트입니다"],
  "的记录 ID 无效": ["has an invalid record ID", "のレコードIDが無効です", "의 레코드 ID가 올바르지 않습니다"],
  "的角色素材格式不受支持": ["uses an unsupported character asset format", "の人物素材形式は対応していません", "의 인물 소재 형식은 지원되지 않습니다"],
  "missing recovery manifest / 缺少恢复清单": ["missing recovery manifest", "復元マニフェストがありません", "복원 매니페스트가 없습니다"],
  "图片记录 ID 无效": ["has an invalid record ID", "のレコードIDが無効です", "의 레코드 ID가 올바르지 않습니다"],
  "角色素材 ID 无效": ["has an invalid character asset ID", "の人物素材IDが無効です", "의 인물 소재 ID가 올바르지 않습니다"],
  "文件名称无效": ["has an invalid file name", "のファイル名が無効です", "의 파일 이름이 올바르지 않습니다"],
  "图片文件名称无效": ["has an invalid image file name", "の画像ファイル名が無効です", "의 이미지 파일 이름이 올바르지 않습니다"],
  "原图文件名称无效": ["has an invalid source image file name", "の元画像ファイル名が無効です", "의 원본 이미지 파일 이름이 올바르지 않습니다"]
};
for (const [key, translations] of Object.entries(RUNTIME_ERROR_TRANSLATIONS)) {
  [EN, JA, KO].forEach((dictionary, index) => { dictionary[key] = translations[index]; });
}

const originalText = new WeakMap();
const originalAttrs = new WeakMap();

export function resolveLanguage(preference = 'auto', languages = globalThis.navigator?.languages || [globalThis.navigator?.language]) {
  if (SUPPORTED_LANGUAGES.includes(preference)) return preference;
  for (const candidate of languages || []) {
    const base = String(candidate || '').toLowerCase().split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(base)) return base;
  }
  return 'en';
}

export function explanationLanguage(language) {
  return language === 'zh' || language === 'ja' || language === 'ko' ? language : '';
}

export function explanationLabel(language) {
  return language === 'ja' ? t('日语解读', {}, language) : language === 'ko' ? t('韩语解读', {}, language) : t('中文解读', {}, language);
}

export function t(key, vars = {}, language = document.documentElement.dataset.language || 'zh') {
  let value = DICTIONARIES[language]?.[key] || key;
  for (const [name, replacement] of Object.entries(vars)) value = value.replaceAll(`{${name}}`, () => String(replacement));
  return value;
}

// Detail values inside runtime errors are usually upstream diagnostics (API
// keys, model names, raw JSON) and must stay byte-exact. Only detail text that is
// itself a phrase we have a translation for is rewritten; anything else is
// returned unchanged, so unknown upstream text never gets mangled.
function localizedDetail(value, language) {
  if (language === 'zh' || !value) return value;
  const translated = t(String(value), {}, language);
  return translated === value ? value : translated;
}


// Action words embedded in provider error sentences, so a templated message such
// as "APImart 反推失败：…" keeps its wording translatable.
const ACTION_LABELS = {
  '请求': ['request', 'リクエスト', '요청'],
  '随机提示词': ['random prompt', 'ランダムプロンプト', '랜덤 프롬프트'],
  '反推': ['image analysis', '画像解析', '이미지 분석'],
  '生图提交': ['generation submission', '生成の送信', '생성 제출'],
  '任务查询': ['task query', 'タスク照会', '작업 조회'],
  '生图': ['image generation', '画像生成', '이미지 생성'],
  '图生图': ['image editing', '画像編集', '이미지 편집'],
  '图片编辑': ['image editing', '画像編集', '이미지 편집'],
  '图片上传': ['image upload', '画像アップロード', '이미지 업로드'],
  Gemini: ['Gemini', 'Gemini', 'Gemini'],
  Responses: ['Responses', 'Responses', 'Responses']
};
const LANGUAGE_INDEX = { en: 0, ja: 1, ko: 2 };
const WORKFLOW_LABELS = {
  '提示词': ['prompt', 'プロンプト', '프롬프트'],
  '宽度': ['width', '幅', '너비'],
  '高度': ['height', '高さ', '높이'],
  '无': ['none', 'なし', '없음']
};

function actionLabel(value, language) {
  const index = LANGUAGE_INDEX[language];
  if (index == null) return value;
  return ACTION_LABELS[String(value).trim()]?.[index] ?? value;
}

// Keys carrying {placeholders} describe messages that only exist once the code
// interpolates them, so an exact dictionary lookup can never match. Derive a
// matcher from the key itself; longer literal text wins, which keeps specific
// wordings ahead of generic templates.
const NUMERIC_PLACEHOLDERS = new Set(['status', 'count', 'index', 'number', 'maxEntries', 'attempts', 'minutes']);
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function patternFromKey(key) {
  const names = [];
  let pattern = '^';
  let last = 0;
  for (const match of key.matchAll(/\{(\w+)\}/g)) {
    pattern += escapeRegex(key.slice(last, match.index));
    names.push(match[1]);
    // A trailing detail may be absent (some call sites append it conditionally).
    if (match[1] === 'detail') pattern += '([\\s\\S]*)';
    else pattern += NUMERIC_PLACEHOLDERS.has(match[1]) ? '(\\d+)' : '([\\s\\S]+?)';
    last = match.index + match[0].length;
  }
  pattern += escapeRegex(key.slice(last)) + '$';
  return { key, names, regex: new RegExp(pattern, 'u'), literalLength: key.replace(/\{\w+\}/g, '').length };
}

const PLACEHOLDER_KEYS = Object.keys(RUNTIME_ERROR_TRANSLATIONS)
  .filter((key) => /\{\w+\}/.test(key))
  .sort((left, right) => patternFromKey(right).literalLength - patternFromKey(left).literalLength)
  .map(patternFromKey);

function localizePlaceholderKey(raw, language, detailSuffix) {
  for (const entry of PLACEHOLDER_KEYS) {
    const match = raw.match(entry.regex);
    if (!match) continue;
    const vars = {};
    entry.names.forEach((name, index) => {
      const value = match[index + 1];
      let localized = value;
      if (name === 'action' || name === 'task') localized = actionLabel(value, language);
      else if (name === 'error') localized = localizeRuntimeError(value, language);
      else if (name === 'description' || (name === 'fields' && value === '无')) {
        localized = WORKFLOW_LABELS[value]?.[LANGUAGE_INDEX[language]] ?? value;
      }
      // Some call sites embed the separator inside the captured text; normalize
      // so detailSuffix always contributes exactly one separator.
      vars[name] = name === 'detail'
        ? detailSuffix(localizedDetail(String(localized).replace(/^\s*[:：]\s*/, ''), language))
        : localized;
    });
    return t(entry.key, vars, language);
  }
  return '';
}


export function localizeRuntimeError(error, language = document.documentElement.dataset.language || 'zh') {
  const raw = String(error?.message || error || '').trim();
  if (!raw) return t('未知错误', {}, language);
  const detailSuffix = value => value ? `${language === 'zh' ? '：' : ': '}${value}` : '';
  const normalized = [
    {
      pattern: /^读取 RunningHUB AI 应用失败 HTTP (\d+)$/,
      key: '读取 RunningHUB AI 应用失败 HTTP {status}',
      vars: match => ({ status: match[1] })
    },
    {
      pattern: /^(读取 RunningHUB AI 应用失败|RunningHUB AI 应用提交失败|RunningHUB AI 应用生成失败)：([\s\S]*)$/,
      key: raw.slice(0, raw.indexOf('：')) + '：{error}',
      vars: match => ({ error: match[2] })
    },
    {
      pattern: /^(该 RunningHUB AI 应用不支持所选图片(?:比例|尺寸))：([\s\S]*)$/,
      key: raw.slice(0, raw.indexOf('：')) + '：{value}',
      vars: match => ({ value: match[2] })
    },
    {
      pattern: /Receiving end does not exist|Could not establish connection/i,
      key: '扩展尚未连接当前网页，请刷新页面后重试'
    },
    {
      pattern: /activeTab permission|permission.*(?:capture|active tab)|active tab.*permission/i,
      key: '当前页面截图权限不可用，请返回网页后重新点击框选截图'
    },
    {
      pattern: /Cannot access contents of url|Cannot access a (?:chrome|edge):\/\/|extensions gallery cannot be scripted|当前页面不允许加载网页按钮/i,
      key: '当前页面不允许扩展运行，请在普通 HTTP/HTTPS 网页中使用'
    },
    {
      pattern: /^接口错误 HTTP (\d+)(?:：([\s\S]*))?$/,
      key: '接口错误 HTTP {status}{detail}',
      vars: match => ({ status: match[1], detail: detailSuffix(match[2]) })
    },
    {
      pattern: /^(fal\.ai) 接口错误 HTTP (\d+)(?:：([\s\S]*))?$/,
      key: '{provider} 接口错误 HTTP {status}{detail}',
      vars: match => ({ provider: match[1], status: match[2], detail: detailSuffix(match[3]) })
    },
    {
      pattern: /^HTTP (\d+)，请检查 Base URL 与密钥$/,
      key: 'HTTP {status}，请检查 Base URL 与密钥',
      vars: match => ({ status: match[1] })
    },
    {
      pattern: /^下载生成(图|结果)失败 HTTP (\d+)$/,
      key: raw.startsWith('下载生成图') ? '下载生成图失败 HTTP {status}' : '下载生成结果失败 HTTP {status}',
      vars: match => ({ status: match[2] })
    },
    {
      pattern: /^(APImart|AtlasCloud) 图片上传失败 HTTP (\d+)(?:：([\s\S]*))?$/,
      key: '{provider} 图片上传失败 HTTP {status}{detail}',
      vars: match => ({ provider: match[1], status: match[2], detail: detailSuffix(match[3]) })
    },
    {
      pattern: /^RunningHUB 来源图片上传失败 HTTP (\d+)$/,
      key: 'RunningHUB 来源图片上传失败 HTTP {status}',
      vars: match => ({ status: match[1] })
    },
    {
      pattern: /^(ZenMux )?图生图失败 HTTP (\d+)(?:：([\s\S]*))?$/,
      key: raw.startsWith('ZenMux ') ? 'ZenMux 图生图失败 HTTP {status}{detail}' : '图生图失败 HTTP {status}{detail}',
      vars: match => ({ status: match[2], detail: detailSuffix(match[3]) })
    },
    {
      pattern: /^(QianwenAI|Aliyun Token Plan) 生图未返回图片(?:：([\s\S]*))?$/,
      key: '{provider} 生图未返回图片{detail}',
      vars: match => ({ provider: match[1], detail: detailSuffix(match[2]) })
    },
    {
      pattern: /^默认模型使用的平台尚未配置：([\s\S]+?)。请填写这些平台的 Base URL 与 API Key，或改选已配置平台的默认模型。$/,
      key: '默认模型使用的平台尚未配置：{platforms}。请填写这些平台的 Base URL 与 API Key，或改选已配置平台的默认模型。',
      vars: match => ({ platforms: match[1] })
    },
    {
      pattern: /^当前 OpenRouter 模型不支持 quality (.+)$/,
      key: '当前 OpenRouter 模型不支持 quality {value}',
      vars: match => ({ value: match[1] })
    },
    {
      pattern: /^生图任务等待超过 (.+?) 分钟，请稍后到平台查看任务状态$/,
      key: '生图任务等待超过 {minutes} 分钟，请稍后到平台查看任务状态',
      vars: match => ({ minutes: match[1] })
    },
    {
      pattern: /^公开模型目录可访问，获取到 (\d+) 个 fal\.ai 图片模型；尚未验证 API Key 或生成权限$/,
      key: '公开模型目录可访问，获取到 {count} 个 fal.ai 图片模型；尚未验证 API Key 或生成权限',
      vars: match => ({ count: match[1] })
    },
    {
      // Source fetching concatenates status and MIME type into these two.
      pattern: /^抓取图片失败 HTTP (\d+)$/,
      key: '抓取图片失败 HTTP {status}',
      vars: match => ({ status: match[1] })
    },
    {
      pattern: /^目标不是图片（([\s\S]*)），可能被站点防盗链保护$/,
      key: '目标不是图片（{type}），可能被站点防盗链保护',
      vars: match => ({ type: localizedDetail(match[1], language) })
    }
  ].find(({ pattern }) => pattern.test(raw));
  if (normalized) return t(normalized.key, normalized.vars?.(raw.match(normalized.pattern)) || {}, language);
  if (language === 'zh') return raw;

  // Whole-message dictionary hit (kept before structural guessing so an exact
  // registered wording always wins).
  const exact = t(raw, {}, language);
  if (exact !== raw) return exact;

  // Templated messages: "{placeholders}" only exist after interpolation, so the
  // matcher is derived from the dictionary key itself.
  const templated = localizePlaceholderKey(raw, language, detailSuffix);
  if (templated) return templated;

  // "{file.json}: {Chinese tail}" or "{file.json} {Chinese tail}" — backup and
  // ZIP validation report a Latin identifier followed by a Chinese reason. Only
  // the reason is translated; the identifier stays byte-exact.
  const leading = raw.match(/^([^\s\u4e00-\u9fff][^\s]*?)(?::\s*|\s+)([\s\S]*[\u4e00-\u9fff][\s\S]*)$/u);
  if (leading) {
    const reason = localizeRuntimeError(leading[2], language);
    if (reason !== leading[2]) return `${leading[1]} ${reason}`;
  }

  // "{platform}：{inner error}" wrapper (settings and provider prefixes). The
  // name part is kept verbatim; only the inner message is translated.
  // Only treat the head as a provider name when it reads like one; prose heads
  // (ending in sentence punctuation) must never be reformatted as "name: text".
  const wrapper = raw.match(/^([^：\n。！？；]{1,40})：([\s\S]+)$/u);
  if (wrapper) {
    const inner = localizeRuntimeError(wrapper[2], language);
    if (inner !== wrapper[2]) return `${wrapper[1]}: ${inner}`;
  }
  return raw;
}

function translateTextNode(node, language) {
  if (!originalText.has(node)) originalText.set(node, node.nodeValue);
  const source = originalText.get(node);
  const trimmed = source.trim();
  if (!trimmed) return;
  const translated = t(trimmed, {}, language);
  node.nodeValue = source.replace(trimmed, () => translated);
}

export function localizeDocument(language, root = document) {
  const resolved = resolveLanguage(language, [language]);
  document.documentElement.lang = resolved === 'zh' ? 'zh-CN' : resolved;
  document.documentElement.dataset.language = resolved;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest('script, style, code')) continue;
    translateTextNode(node, resolved);
  }
  const elements = root.querySelectorAll?.('[title], [aria-label], [placeholder], [data-tooltip], [alt]') || [];
  for (const element of elements) {
    if (!originalAttrs.has(element)) originalAttrs.set(element, {});
    const sources = originalAttrs.get(element);
    for (const attr of ['title', 'aria-label', 'placeholder', 'data-tooltip', 'alt']) {
      if (!element.hasAttribute(attr)) continue;
      if (!(attr in sources)) sources[attr] = element.getAttribute(attr);
      element.setAttribute(attr, t(sources[attr], {}, resolved));
    }
  }
  return resolved;
}

export async function getStoredLanguage() {
  const { settings = {} } = await chrome.storage.local.get('settings');
  return resolveLanguage(settings.language || 'auto');
}

export async function initLocalizedPage() {
  const language = await getStoredLanguage();
  localizeDocument(language);
  return language;
}
