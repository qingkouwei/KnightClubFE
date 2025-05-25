/**
 * 登录页面交互逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const tabs = document.querySelectorAll('.login-tabs .tab');
    const forms = document.querySelectorAll('.form-container');
    const phoneLoginForm = document.querySelector('.phone-login');
    const passwordLoginForm = document.querySelector('.password-login');
    const getCodeBtn = document.querySelector('.get-code-btn');
    const phoneInput = document.querySelector('.phone-input');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('.password-login .form-input[type="password"]');
    const loginButtons = document.querySelectorAll('.login-btn');

    // 切换登录方式标签
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // 移除所有活动状态
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // 设置当前标签和表单为活动状态
            tab.classList.add('active');
            forms[index].classList.add('active');
        });
    });

    // 获取验证码倒计时功能
    let countdown = 0;
    let timer = null;

    function startCountdown() {
        countdown = 60;
        getCodeBtn.disabled = true;
        getCodeBtn.textContent = `${countdown}秒后重试`;
        
        timer = setInterval(() => {
            countdown--;
            getCodeBtn.textContent = `${countdown}秒后重试`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                getCodeBtn.disabled = false;
                getCodeBtn.textContent = '获取验证码';
            }
        }, 1000);
    }

    // 获取验证码按钮点击事件
    if (getCodeBtn) {
        getCodeBtn.addEventListener('click', function() {
            // 验证手机号格式
            const phoneNumber = phoneInput.value.trim();
            if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
                alert('请输入有效的手机号码');
                return;
            }
            
            // 模拟发送验证码
            console.log('发送验证码到:', phoneNumber);
            startCountdown();
            
            // 这里可以添加实际的验证码发送API调用
        });
    }

    // 密码显示/隐藏切换
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }

    // 登录按钮点击事件
    loginButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = this.closest('.form-container');
            
            // 根据不同的登录表单执行不同的登录逻辑
            if (parent.classList.contains('phone-login')) {
                handlePhoneLogin();
            } else if (parent.classList.contains('password-login')) {
                handlePasswordLogin();
            }
        });
    });

    // 手机验证码登录处理
    function handlePhoneLogin() {
        const phone = phoneLoginForm.querySelector('.phone-input').value.trim();
        const code = phoneLoginForm.querySelector('.code-input').value.trim();
        const agreement = phoneLoginForm.querySelector('input[type="checkbox"]').checked;
        
        // 简单验证
        if (!phone) {
            alert('请输入手机号码');
            return;
        }
        
        if (!code) {
            alert('请输入验证码');
            return;
        }
        
        if (!agreement) {
            alert('请阅读并同意用户协议和隐私政策');
            return;
        }
        
        // 模拟登录请求
        console.log('手机号登录:', phone, code);
        simulateLogin();
    }

    // 账号密码登录处理
    function handlePasswordLogin() {
        const account = passwordLoginForm.querySelector('.form-input[type="text"]').value.trim();
        const password = passwordLoginForm.querySelector('.form-input[type="password"]').value;
        
        // 简单验证
        if (!account) {
            alert('请输入账号');
            return;
        }
        
        if (!password) {
            alert('请输入密码');
            return;
        }
        
        // 模拟登录请求
        console.log('账号密码登录:', account);
        simulateLogin();
    }

    // 模拟登录过程
    function simulateLogin() {
        const loginBtn = document.querySelector('.login-btn');
        const originalText = loginBtn.textContent;
        
        loginBtn.disabled = true;
        loginBtn.textContent = '登录中...';
        
        // 模拟网络延迟
        setTimeout(() => {
            loginBtn.disabled = false;
            loginBtn.textContent = originalText;
            
            // 登录成功后跳转到首页
            window.location.href = 'index.html';
            
            // 实际项目中应该调用后端API进行身份验证
            // 例如：
            /*
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert(data.message || '登录失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('网络错误，请稍后重试');
            });
            */
        }, 1500);
    }
});
