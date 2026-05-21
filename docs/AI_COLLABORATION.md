# AI Collaboration

## Collaboration Rules

以后修改代码时必须遵守：

- 不要无关重构
- 不要顺手改数据库
- 不要删除已有功能
- 不要修改 env 命名
- 不要破坏 Auth / letters / replies / user_penpals 主链路
- 修改前先说明会动哪些文件
- 修改后说明改了什么
- 大任务要拆小步
- UI 优化不得影响业务逻辑
- 业务逻辑优化不得顺手改 UI

每次改动都应该先理解当前数据流，再决定最小修改范围。

## File Boundary Rules

### Business Logic

业务逻辑优化只改必要的 server、db、ai 或 API 文件。

不要因为业务逻辑调整顺手改：

- 页面布局
- 文案风格
- 组件样式
- 全局 CSS
- 设计系统

### UI Work

UI 优化只改必要的页面、组件或样式文件。

不要因为 UI 调整顺手改：

- 数据库结构
- RLS
- Auth
- 回信生成逻辑
- cron 逻辑
- DeepSeek provider

### Database Work

除非用户明确要求，不要修改数据库结构。

不要主动新增：

- table
- column
- index
- trigger
- policy
- migration

如果确实需要数据库变更，必须先说明原因、影响范围和回滚方式。

## Core Product Rules

当前核心产品规则：

- 用户写未知远方信时，不提前知道 penpal
- 只有 reply 生成成功后才 insert user_penpals
- Discover/Profile 只显示已邂逅笔友
- waiting tab 只显示 pending letters
- received tab 只显示 replied letters
- scheduled_reply_at 控制回信时间
- cron/process-replies 负责到期回信生成
- DeepSeek 只在 server side 调用

这些规则是产品体验的一部分，不要在未确认的情况下改变。

## Reply Generation Flow

回信生成主链路：

1. 用户写信，插入 letters
2. letters 初始为 pending
3. scheduled_reply_at 决定回信可生成时间
4. 手动生成 API 或 cron/process-replies 到期生成 reply
5. reply 生成成功后插入 replies
6. reply 生成成功后确保 user_penpals 存在
7. letters 更新为 replied，并设置 reply_generated = true

如果中途生成失败，不要轻易把 letter 永久标记为 failed，避免临时 API 抖动造成不可恢复状态。

## AI Memory Rules

AI 记忆功能服务于自然回信，不应该变成监控感。

- 只记录用户明确表达的长期信息
- 不存整封信
- 回信中可以自然参考记忆
- 不要每封信都生硬提起记忆
- 不要说“数据库里记得”
- 不要表现得像监控用户

## Communication Rules

AI 协作时应该：

- 修改前说明计划影响哪些文件
- 修改中保持改动小而清楚
- 修改后说明新增/修改了什么
- 说明如何验证
- 说明没有做哪些越界事情

当用户明确要求“只新增文档”“不要改业务代码”“不要改 UI”时，必须严格遵守。
