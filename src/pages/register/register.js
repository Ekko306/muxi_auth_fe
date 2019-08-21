import React, {Component} from 'react'
import './register.css';
import Background from '../../images/login.png';
import Service from '../../compoment/service'
var sectionStyle = {
    width: "100%",
    padding: "0 0 0 0",
    margin: "0 auto",
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover' 
  };

class  Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            email:'',
            f_password:'',
            s_password:'',
            flag:false
    }}
    ChangeUsername(e) {
        this.setState({
            username:e.target.value
        })
    }
    ChangeEmail(e) {
        
        this.setState({
          email: e.target.value
        });
    } 
    ChangeFPassword(e) {
        this.setState({
          f_password: e.target.value
        });
    }
    ChangeSPassword(e) {
        this.setState({
          s_password: e.target.value
        });
        // if(this.state.f_password!==this.state.s_password){
        //     this.setState({
        //         flag:false
        //     })
        // }
        // if(this.state.f_password===this.state.s_password){
        //     this.setState({
        //         flag:true
        //     })
        // }
    }
    register(){
        if(this.state.s_password===this.state.f_password){
        Service.register(this.state.email , this.state.username, this.state.s_password).then(res=>{
            if (res !== null && res!== undefined) {
                alert("注册成功")
                let landing = localStorage.getItem('landing')
                if (landing) {
                    window.location.href = 'http://'+ landing + '?username=' + this.username +'&token=' + res.token + '&id=' + res.user_id
                }
            } else {
                this.failed = true
            }
            }
        )}
        else{
            alert("两次输入密码不一致")
        }
    }
    render() {
        const { username , email , f_password , s_password }= this.state
        return (
            <div className="sign" style={sectionStyle} >
                <div className="main">
                    <div className="logo">
                       <img src={require('../../images/muxilogo.png')} alt=" " />
                    </div>
                    
                    <div className="sign-in-container" >
                        <div className="title" >注册</div>
                        <form method="post" >
                            <div className="input-prepend" >
                                <input type="text"
                                    placeholder="用户名"
                                    value={username}
                                    onInput={this.ChangeUsername.bind(this)}
                                    onChange={this.ChangeUsername.bind(this)}
                                    className="user_nickname" />
                            </div>
                            <div className="input-prepend" >
                                <input type="email"
                                    placeholder="登录邮箱"
                                    value={email}
                                    onInput={this.ChangeEmail.bind(this)}
                                    onChange={this.ChangeEmail.bind(this)}
                                    className="user_email_number" />
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="密码"
                                    value={f_password}
                                    onInput={this.ChangeFPassword.bind(this)}
                                    onChange={this.ChangeFPassword.bind(this)}
                                    className="user_password" />
                            </div>
                            <div className="input-prepend" >
                                <input type="password"
                                    placeholder="确认密码"
                                    value={s_password}
                                    onInput={this.ChangeSPassword.bind(this)}
                                    onChange={this.ChangeSPassword.bind(this)}
                                    className="user_confi_password" />
                            </div>
                            <div className="auto-login-btn" >
                                <input type="checkbox"
                                    value="true"
                                    checked="check"
                                    name="session[auto_login]"
                                    className="session_auto_login" />  <span > 下次自动登陆 </span>
                            </div>
                            <button className="sign-in-button" type="button" onClick={this.register.bind(this)} > 开启新世界大门 </button>
                            <p className="sign-in-msg" > 以上设置可在页面右上角个人信息中再次修改 </p>

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;