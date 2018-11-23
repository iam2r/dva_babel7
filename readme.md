坑：
react组件中如果想要用
import styles from './styles.scss';

const CountApp = ({ home, dispatch }) => {
    const onClick = method => {
        dispatch({ type: `home/${method}`, payload: { userName: 'zrnokia5231', password: '12345678' } })
    }

    return (
        <div className={styles.normal}>
            <div className={styles.record}>Record: {home.record}</div>
            <div className={styles.current}>{home.current}</div>
            <p>{home.message}</p>
            <div className={styles.button}>
                <Button type="primary" onClick={() => { onClick('login') }}>+</Button>
            </div>
        </div>
        
    );


};

这种方式来编写样式  需要在webpack对样式的加载那里配置models=true
 {
          loader: 'css-loader',
          options: {
            localIdentName: 'purify_[hash:base64:5]',
            modules: true
          }
        },

开启css模块化   那么编译出来的样式文件的class名会变化。

比如你的样式为
.normal{
    height:50px
}
开启css模块化后
样式就会变成
.sjdklfjlkejworsoj{
    height:50px
}

你在html中如果 
    Tip：（代表<  )代表> 写成<>会被编译成html暂时用（）代替

写（div className="normal"） （/div） 就不行了
只能写成（div className="sjdklfjlkejworsoj"） （/div）
但sjdklfjlkejworsoj是自动生成的  你在写代码的时候未知。
所以需要写成（div className={style.normal}） （/div）
最终就会编译成（div className="sjdklfjlkejworsoj"） （/div）
保证样式生效

那么问题来了
第三方ui库中的css里的class会被编译成hash打乱名字，
html中的默认class还是正常的。  第三方ui库自然会失效。

那么怎么解决？

有人说把webpack中对样式的加载配置里排除 第三方库
如下
  {
        test: /\.s?css$/,
        exclude: /node_modules/,//排除node_modules中的样式，避免开启css-loader?modules
        use: [utils.isDev() ? 'vue-style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../"
          }
        },
        {
          loader: 'css-loader',
          options: {
            localIdentName: 'purify_[hash:base64:5]',
            modules: true
          }
        }, 'postcss-loader', 'sass-loader'],
    }

有道理 不错  这样第三方ui库的样式不会走css-loader自然不会被模块化

然而问题又来了  按需加载第三方ui库  可是会自动import node_modules ui库对应组件的样式的。 
不走样式是不可能。

所以我们的需求是，第三方ui库中的样式走webpack样式加载器但不开启css模块化就ok
所以解决方案就是另外再配置一个loader
  {
        test: /\.s?css$/,
        include: /antd/,//对ui库特殊处理，走加载，但不能开启modules: true
        use: [utils.isDev() ? 'vue-style-loader' : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: "../"
          }
        },
        {
          loader: 'css-loader',
        }, 'postcss-loader', 'sass-loader'],
      },

这样第三方ui库中的样式也会被webpack处理， 并且不开启css模块化