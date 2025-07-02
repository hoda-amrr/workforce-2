*** Settings ***
Resource    ../PO/loginPage.robot
Resource    ../PO/button.robot
Resource    ../PO/checkbox.robot
Resource    ../PO/input.robot

*** Keywords ***
Enter Email
    [Arguments]    ${email}
    Input Text    id:${LOGIN_EMAIL_INPUT}    ${email}

Enter Password
    [Arguments]    ${password}
    Input Text    id:${LOGIN_PASSWORD_INPUT}    ${password}

Click Sign In
    Click Element    id:${LOGIN_SIGN_IN_BUTTON}

Verify Login Success
    # TODO: Replace with actual dashboard element ID after login
    Wait Until Page Contains Element    id=some-dashboard-element    timeout=10s 