import styles from './styles.scss';
import { connect } from 'dva';
import { Button } from 'antd';

console.warn(styles)
const CountApp = ({ home, dispatch }) => {
    const onClick = async method => {
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



CountApp.propTypes = {

};

export default connect(state => state)(CountApp);


// @connect(state=>state)
// class CountApp extends React.Component {

//     onClick(method) {
//         const {dispatch} = this.props;
//         dispatch({ type: `home/${method}`, payload: { userName: 'zrnokia5231', password: '12345678' } })
//     }

//     render() {
//         const { home } = this.props;

//         return (
//             <div className={styles.normal}>
//                 <div className={styles.record}>Record: {home.record}</div>
//                 <div className={styles.current}>{home.current}</div>
//                 <p>{home.message}</p>
//                 <div className={styles.button}>
//                     <Button type="primary" onClick={() => { this.onClick('login') }}>+</Button>
//                 </div>
//             </div>

//         );
//     }
// }
// export default CountApp;