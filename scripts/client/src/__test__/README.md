# User Details Test Cases

# Details Page
1. Click on the action button, fill in the details and then check for the message "User Record Created Successfully" after clicking the Save button.
2. Click the action button and verify if all fields are present and then submit the form without filling and check for the Yup error.
3. Change the data in order to create a duplicate record and verify the 'Duplicate Record found'.
4. Click the action button and create a record with invalid email ID and enter the start date after the end date and check for the Yup error messages.
5. Click the action button and create a record and click on Save without making any changes and check for the message 'No Changes to Update' and then change the employee ID and check for the message 'Record Updated successfully'.
6. Click the action button and create a record and click on Change Password button, change password and re-enter password fields and check for the message 'Password Updated successfully' 
7. Click on the Delete button and make sure a prompt appears, click cancel and verify the prompt closes.
8. Click on the Delete button and make sure a prompt appears, click confirm, data removes from the list and control goes to list page.
9. Change the information on page and click on switch to view, verify all information is reset back to the original data.
10. Switch the browser language to your primary language and verify the detail page shows in primary language.
11. Switch the browser language to your secondary language and verify the detail page shows in secondary language. 
 
# List Page
1. Checking if all the records present in handler are present on list page.
2. Checking if correct records after filtering by keyword 'India' are present on list page.
3. Checking for 'no records to display' message after filtering by keyword 'Germany' on list page.
4. Switch the browser language to your primary language and verify the list page shows in primary language.
5. Switch the browser language to your secondary language and verify the list page shows in secondary language.

# Navbar Page
1. Checking if correct records after filtering by keyword 'India' are present on list page and moving back to list page after clicking on User button
2. Switch the browser language to your primary language and verify the navigation couple of items shows in secondary language.
3. Switch the browser language to your primary language and verify the navigation couple of items shows in default (english) language.
4. Switch the browser language to secondary language as primary .checking the fallback functionality.


