/**
 * 注册页面交互逻辑
 */

document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step-indicator .step');
    const nextButtons = document.querySelectorAll('.next-step-btn');
    const prevButtons = document.querySelectorAll('.prev-step-btn');
    const registerButton = document.querySelector('.register-btn');
    const getCodeBtn = document.querySelector('.get-code-btn');
    const phoneInput = document.querySelector('.phone-input');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const avatarInput = document.getElementById('avatar-input');
    const avatarPreview = document.querySelector('.avatar-preview');
    
    let currentStep = 0;
    
    // 显示当前步骤
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.classList.remove('active');
            stepIndicators[index].classList.remove('active');
            
            if (index <= stepIndex) {
                stepIndicators[index].classList.add('active');
            }
        });
        
        formSteps[stepIndex].classList.add('active');
        currentStep = stepIndex;
    }
    
    // 下一步按钮点击事件
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            if (validateStep(index)) {
                showStep(index + 1);
            }
        });
    });
    
    // 上一步按钮点击事件
    prevButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // 在步骤2点击返回，回到步骤1
            // 在步骤3点击返回，回到步骤2
            showStep(currentStep - 1);
        });
    });
    
    // 表单验证
    function validateStep(stepIndex) {
        switch (stepIndex) {
            case 0: // 验证手机号和验证码
                const phone = phoneInput.value.trim();
                const code = document.querySelector('.code-input').value.trim();
                
                if (!phone) {
                    showError('请输入手机号码');
                    return false;
                }
                
                if (!/^1[3-9]\d{9}$/.test(phone)) {
                    showError('请输入有效的手机号码');
                    return false;
                }
                
                if (!code) {
                    showError('请输入验证码');
                    return false;
                }
                
                // 这里假设验证码正确，实际应该与后端验证
                return true;
                
            case 1: // 验证用户名和密码
                const username = document.querySelector('.username-input').value.trim();
                const password = document.querySelector('.password-input').value;
                const confirmPassword = document.querySelector('.confirm-password-input').value;
                
                if (!username) {
                    showError('请设置用户名');
                    return false;
                }
                
                if (username.length < 4 || username.length > 20) {
                    showError('用户名长度应为4-20个字符');
                    return false;
                }
                
                if (!password) {
                    showError('请设置密码');
                    return false;
                }
                
                if (password.length < 8 || password.length > 20) {
                    showError('密码长度应为8-20个字符');
                    return false;
                }
                
                if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
                    showError('密码需包含字母和数字');
                    return false;
                }
                
                if (password !== confirmPassword) {
                    showError('两次输入的密码不一致');
                    return false;
                }
                
                return true;
                
            default:
                return true;
        }
    }
    
    // 显示错误提示
    function showError(message) {
        alert(message); // 简单用alert展示错误，实际可以用更友好的UI
    }
    
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
                showError('请输入有效的手机号码');
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
            const passwordInput = this.parentNode.querySelector('input');
            
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
    
    // 头像上传预览
    if (avatarInput) {
        avatarInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    avatarPreview.innerHTML = `<img src="${e.target.result}" alt="用户头像" style="width: 100%; height: 100%; object-fit: cover;">`;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // 选择日期
    const birthdayInput = document.querySelector('.birthday-input');
    if (birthdayInput) {
        birthdayInput.addEventListener('click', function() {
            // 在实际项目中，这里应该打开日期选择器
            // 为了演示，我们使用prompt简单模拟
            const birthdate = prompt('请输入您的生日 (YYYY-MM-DD):', '1990-01-01');
            if (birthdate) {
                this.value = birthdate;
            }
        });
    }
    
    // 选择地区
    const locationInput = document.querySelector('.location-input');
    if (locationInput) {
        locationInput.addEventListener('click', function() {
            // 在实际项目中，这里应该打开地区选择器
            // 为了演示，我们使用prompt简单模拟
            const location = prompt('请输入您所在的地区:', '北京市');
            if (location) {
                this.value = location;
            }
        });
    }
    
    // 注册按钮点击事件
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            // 验证协议是否勾选
            const agreement = document.querySelector('#step3 input[type="checkbox"]').checked;
            
            if (!agreement) {
                showError('请阅读并同意用户协议和隐私政策');
                return;
            }
            
            // 模拟注册流程
            const originalText = registerButton.textContent;
            registerButton.disabled = true;
            registerButton.textContent = '注册中...';
            
            setTimeout(() => {
                registerButton.disabled = false;
                registerButton.textContent = originalText;
                
                // 注册成功，跳转到登录页
                window.location.href = 'login.html';
                
                // 实际项目中应该调用后端API进行注册
            }, 1500);
        });
    }
});
