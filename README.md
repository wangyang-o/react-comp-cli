# install pnpm

```
npm install -g pnpm
```

# pnpm install and run

pnpm 会自动下载所有工作空间的 node_modules

```
pnpm i
```

打包运行：

```
pnpm build
```

进入 react-example,可以本地依赖工作空间的组件，查看组件实例（这个项目可以任意选）。

```
cd react-example
pnpm start
```

需要注意的就是记得在 package.json 里面添加你的依赖,例如：

```
"@wy/react-comp": "workspace:*"
```
