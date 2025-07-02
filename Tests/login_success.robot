*** Settings ***
Library           SeleniumLibrary
Resource          ../Resources/Keywords/LoginKeywords.robot

Suite Setup       Open Browser To Login Page
Suite Teardown    Close Browser

*** Variables ***
${WORKFORCE_URL}      https://staging-workforce.trianglz.com/login
${EMAIL}             workforce@trianglz.com
${PASSWORD}          Workforce0!

*** Test Cases ***
Successful Login
    [Documentation]    Test successful login with valid credentials
    Enter Email        ${EMAIL}
    Enter Password     ${PASSWORD}
    Click Sign In
    # TODO: Replace with actual dashboard element ID after login
    Verify Login Success

*** Keywords ***
Open Browser To Login Page
    Open Browser    ${WORKFORCE_URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains Element    id:${LOGIN_EMAIL_INPUT}    timeout=10s 