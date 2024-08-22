1) Displaying real time error messages:
An event is triggered in the email input field when key is released (keyup event).
Validation is checked and after every keyup event the message is displayed.
When the email input is empty, messages and disable class is removed.

2) Conditional error message:
In the index.html file another hint span with id 'empty-hint' is added in the email field and the style is changed accordingly.
When the email field is empty the display is set to block corresponding to that span.
