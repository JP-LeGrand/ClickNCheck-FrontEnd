<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="stylesheet" href="./login.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.2/knockout-min.js"></script>        
        <title>Administrator Registration</title>
    </head>

    <body>
        <header class="headSection">
            <img src="../../../icons/main.svg"/>
        </header>

        <div class="mainSection">
            <div class="registrationHeading">Existing User <b>Sign In</b></div> 
            <div class="form-group">
                <label class="inp">
                    <input placeholder="&nbsp;" data-bind="value: email" />
                    <span class="label">Email</span>
                    <p class="error" data-bind="visible: emailEntered() == false">Please enter your email address</p>
                    <span class="border"></span>
                </label>
            </div>

            <div class="form-group">
                <label class="inp">
                    <input placeholder="&nbsp;" type="password" data-bind="value: password" />
                    <span class="label">Enter Password</span>
                    <p class="error" data-bind="visible: passwordEntered() == false">Please enter password</p>
                    <span class="border"></span>
                </label>
            </div>

            <div class="form-group">
                <button data-bind="click: login">Login</button>
            </div> 
        </div>

        <footer class="footSection">
            <a id="ClicknCheck">ClicknCheck 2018</a>&nbsp;
            <a id="T&Cs">T’s & C’s</a>&nbsp;
            <a id="ContactUs">Contact Us</a>
        </footer>
        <script src="../../../scripts/constants.js"></script>
        <script src="./loginVM.js"></script>
    </body>
</html>