# Git

+ 主要功能版本控制
+ 采用的是分布版本工作

+ 集中化的版本控制  ->  SVN
	+ 所有代码都保存在一台服务器中,进行集中化的管理
	+ 当服务器宕机后就无法进行代码提交
	+ 如果磁盘故障,可能还会导致数据丢失
	+ 客户端只放置最新的版本快照
	+ 管理便利
	+ 回滚速度慢

+ 分布式的版本控制  ->  Git
	+ 所有的版本都会存在每一个用户电脑中
	+ 采用了极致的算法压缩占用的内存只比 SVN 多不了多少
	+ 因为拥有很多份的版本快照,所以不怕丢失
	+ 版本控制可以在本地进行,不怕断网
	+ 回滚速度快

+ 区域
	+ 工作区  -> 写代码
	+ 暂存区  -> 暂存代码
	+ 版本库  -> 提交代码

+ 对象
	+ Git对象
		+ key:val 组成的键值对 (key 是 val 对应的 hash)
		+ 键值对在 git 内部是一个 blob 类型
	+ 数对象
	+ 提交对象

+ 常用的 linux 命令
	+ clear -> 清屏
	+ echo 'message' -> 控制台输出
	+ ll -> 输出当前文件夹下的子文件和子目录
	+ rm path -> 删除文件
	+ mv oldPath newPath -> 重命名

# SSH

+ ssh-keygen -t rsa -C emile -> 生成公私钥

+ ssh -T git@github.com 测试链接是否成功
+ ssh -T git@gitee.com

+ ssh-agent -s -> 设置
+ ssh-add ~/.ssh/id_rsa  -> 添加秘钥
+ 添加秘钥失败 ->
  + 输入eval `ssh-agent -s`
  + 再输入 eval `ssh-agent -s`
+ 然后在测试链接

+ 自动登录,在 git 安装目录的 etc/bash.bashrc 后加两句
  + eval `ssh-agent -s`
  + eval `ssh-add D://SSH/id_rsa`

# tag 标签

+ tag -> 给指定的版本打上 tag 默认都是轻量标签
  + git tag -a v -> 可以加标注的标签
  + git tag -> 列出所有的 tag
  + git tag v0.1 -> 默认给最新分支打 tag
  + git tag v0.1 commitHash -> 给指定的分支打上 tag
  + git show v0.1 -> 查看标签
  + git tag -d v0.1 -> 删除版本
  + git checkout tagName -> 将 HEAD 指向指定的 tag
  + git checkout -b "v0.1" -> 跳到指定的 tag 并创建新分支

# 初始化配置

+ git --version -> 版本查看
+ 设置用户名和邮箱
	+ --global 代表用户的配置
	+ --system 代表当前系统的配置
	+ 不写就是当前项目
+ git config --global user.name "name"
+ git config --global user.email name@163.com
+ git config --global --unset user.name -> 删除
+ git config --list -> 查看配置信息

+ 配置命令别名
+ git config --global alias.简写 "命令"
+ 删除别名
+ git config --global --unset alias.别名

```cmd
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

# 远程仓库

+ origin -> 项目别名   url -> 仓库地址
+ 这里拉取下来的是远程跟踪分支,并不是本地分支
+ 创建空的远程仓库 -> 得到仓库链接

+ git remote -v -> 查看版本
+ git remote add origin url -> 设置仓库的别名
+ git init -> 创建本地仓库, add commit 然后提交到远程仓库

+ git pull origin master -> 提交指定分支到远程仓库
  + 且如果远程没有目标分支,就会创建新的远程分支
+ git clone url -> 克隆远程仓库到本地 : 会自动生成跟踪的分支
+ git fetch origin branchName -> 只写主机名,为全部拉取
  + -> 代码拉取下来后需要进行手动的合并
+ git pull origin next:target -> 拉取后自动进行合并
  + target 需要合并的目标分支,省略默认当前分支

+ 简写使用 git push 或 git fetch 或 git pull
+ 让分支一一对应远程分支,都可以使用简写的形式
+ git push --set-upstream-to origin branchName
+ git branch -u origin/branchName
+ 分支 nice 跟踪远程对应分支的例子,在该分支下执行命令
  + -> git branch -u my-blog/nice
+ git branch -vv -> 查看已经跟踪的分支

+ 拉取并创建自动跟踪的分支
  + git checkout -b branchName origin/branchName
  + git checkout --track origin/branchName
  + git checkout -b sf origin/branchName -> 更换名字

# 基础命令

+ git init -> 初始化仓库
+ git status -> 查看文件状态
+ git diff -> 查看哪些文件修改了还没暂存
+ git diff--staged -> 暂存了还没提交 or --cached
+ git show -> 显示提交日志

+ git rm path -> 删除文件并暂存
+ git mv oldPath newPath -> 重命名文件

+ git add ./ -> 将当前修改添加到暂存区
	+ 流程工作目录 -> git对象到版本区 -> 暂存区

+ git commit -> 提交 + 会进入到编辑器模式,可以写多行注释
+ git commit -m "提交描述信息,注释" -> 提交+单行注释
+ -a 提交只能在文件被跟踪后才可以使用
+ git commit -a -m "跳过暂存直接提交"

+ git log --oneline  -> 查看提交日志
+ git reflog ->  查看所有的日志,包括已经删除的

# 分支操作

+ git log --oneline --decorate --graph --all
+ 设置别名
+ git config --global alias.ls "log --oneline --decorate --graph --all"

+ git branch name -> 创建一个分支
+ git branch -> 查看所有分支,并显示当前所在分支
+ git branch -d name -> 删除分支  -D 强制删除
+ git branch -v -> 查看每一个分支最后的一次提交
+ git branch name contentHash -> 在目标的版本创建分支 contentHash 代表版本的 hash 值

+ 切换分支会将工作目录的文件切换到分支最后一次提交的时刻
+ 切换分支前需要保证当前分支为提交状态
+ git checkout name -> 切换分支
+ git checkout -b name -> 新建分支并切换
+ 如果在切换的时候又为暂存的修改 或者 有未提交的暂存
  + 分支可以切换成功,但是可能会污染其他分支
  + 所以在切换前一定要 git status 检查文件是否干净


+ git branch --merged -> 查看哪些分支已经合并到当前分支
+ git branch --no-merged -> 查看未合并的分支

+ 一般在主分支上合并次要分支
+ git merge name -> 合并分支
+ 快进合并不会产生冲突 如: 主v3 合并到 次v6 也就是直接快进到 v6 版本
+ 如: 主v6 分支 次v3-8   典型合并,次分支是从主分支低版本的时候分割出去的,但是解决问题后主分支已经切换版本,这是就会导致合并冲突
+ 会提示产生冲突的文件精确到哪一行出现冲突
+ 这时就需要打开文件手动解决

+ git stash -> 将未完成的修改保存到一个栈中,先进后出
+ git stash list -> 查看栈中的储存
+ git stash drop stash@{0} -> 指定要删除的栈数据名
+ git stash apply stash@{0} -> 默认取出最近的数据,同样可以指定要应用的栈
+ git stash pop -> 应用并删除

# 撤销重置

+ 工作区
  + git checkout -- fileName -> 在暂存前撤销更改
  + git restore fileName -> 在暂存前撤销更改

+ 暂存区
  + git reset HEAD fileName -> 从暂存区撤销
  + git restore --staged fileName

+ 版本库
  + git commit --amend -> 重写提交的描述
  + 且在重新提交前使用 git add . 会吧新的内容提交覆盖旧的

+ reset
  + git reflog -> 可以查看能够重置的位置
  + git reset --soft HEAD~(HEAD-hash)
    + -> 重置到目标 hash 的版本,并会带着 HEAD 指针一同跳过去,分支也会一同移动
  + git reset [--mixed] HEAD~
    + -> 带着分支一起动 HEAD,且动了暂存区
  + git reset --head HEAD~
    + -> 动 HEAD 与分支, 动暂存区且动工作区
    + 这个命令可能会导致数据丢失

+ 重置指定文件
  + git reset [--mixed] HEAD filename

# 底层操作

+ git ls-files -s -> 查看暂存区文件
+ git cat-file -p HEAD -> 查看对象细节

# eslint 代码检查

+ npm i -D eslint

+ `eslint ./src` -> 检查指定的代码文件夹
+ `eslint --init` -> 初始化配置规则

+ 在提交代码前自动进行检查,不通过检查就不允许提交
+ npm i -D husky
+ [指南](https://www.npmjs.com/package/husky)

# 忽略文件

+ `#` -> 注释
+ `*` -> 任意个字符
+ `?` -> 匹配一个字符
+ `**` -> 多级目录
+ `/` -> 匹配模式前代表项目根目录
+ `/` -> 在匹配模式后忽略所有的匹配目录,不论层级
+ `.a` -> 忽略所有的 .a 结尾的文件
+ `!.a` -> 排除
+ `doc/*.txt` -> 忽略 doc 下的 txt 结尾的文件,但只有一层
+ `doc/**/*.txt` -> 不论层级

+ git add -f App.class 强制添加需要跟踪的文件

```.gitignore
.DS_Store
node_modules/
/dist/
/build/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln

#忽略跟踪(提交代码时，忽略某一个文件不提交，即某个文件不被版本控制)
git update-index --assume-unchanged file

#恢复跟踪
git update-index --no-assume-unchanged file

#FILE是目标文件路径
```