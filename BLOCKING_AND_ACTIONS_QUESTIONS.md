# Sponsora Admin & Internship App - Block User & Limits Questions

Please write your responses/comments directly under each question.

---

### **Section 1: The handleAction Bug & Admin Actions**

1. **Should I rename `executeActionWithoutConfirm` to `handleAction` to fix the reference error, or would you prefer I update all the button `onClick` handlers to use `executeActionWithoutConfirm`?**
   * *Your answer:* 

2. **When an action like "Increase Limit" succeeds, should we display a specific success animation (like confetti) before refreshing the page data?**
   * *Your answer:* 

3. **If an action fails (e.g., due to a network error), should the modal stay open so you can try again, or should it close and show the error toast?**
   * *Your answer:* 

4. **Do you want to add a loading spinner inside the modal's "Confirm" buttons while the action is executing?**
   * *Your answer:* 

5. **For the "Increase Limit" modal, should we show the user's current limit above the input field so the admin has context before changing it?**
   * *Your answer:* 

6. **When decreasing a limit, what should happen if the admin tries to decrease it below the user's currently used limit? (e.g., show an error, or allow it but stop them from applying to more internships?)**
   * *Your answer:* 

7. **For the "Extend Days" modal, should we offer quick-select preset buttons (e.g., "+7 Days", "+30 Days") alongside the input field?**
   * *Your answer:* 

8. **Do you want a "Refresh Data" button on the user profile page so the admin can manually pull the latest data from Supabase without refreshing the whole browser tab?**
   * *Your answer:* 

---

### **Section 2: Admin UI for Blocked Users**

9. **When a user is blocked, should their profile card change color (e.g., to a red theme or show a red outline) to make it immediately obvious to the admin?**
   * *Your answer:* 

10. **Should the "Block User" button completely disappear when the user is already blocked, or just become disabled/grayed out?**
    * *Your answer:* 

11. **Should we add a prominent "BLOCKED" banner at the top of the user's profile page?**
    * *Your answer:* 

12. **Do you want to record the exact timestamp of when the user was blocked and display it on the admin page?**
    * *Your answer:* 

13. **Should we prompt the admin for a "Reason for blocking" before they confirm the block action?**
    * *Your answer:* 

14. **If we collect a reason, should this reason be visible only to admins, or also shown to the user on their blocked popup?**
    * *Your answer:* 

15. **Should we add a confirmation step for "Unblock User" just like we have for "Block User"?**
    * *Your answer:* 

---

### **Section 3: Intercepting Blocked Users on the Internship App**

16. **In the Internship App, where should we check if the user is blocked? (e.g., globally in `layout.jsx` so it covers every page, or only on protected routes?)**
    * *Your answer:* 

17. **Are there any public pages on the Internship App (like the homepage, about page, or FAQ) that a blocked user SHOULD still be able to see?**
    * *Your answer:* 

18. **If the user is blocked, should the popup be strictly un-closeable (a hard block), preventing them from interacting with any part of the app behind it?**
    * *Your answer:* 

19. **Do you want the background behind the blocked popup to be blurred out?**
    * *Your answer:* 

20. **For the "cute doodle art image" on the blocked popup, do you have a specific doodle in mind, or should I generate a new one using my image generation tool?**
    * *Your answer:* 

21. **If I generate the doodle, what should it look like? (e.g., a sad robot, a locked door, a traffic cone with a sad face?)**
    * *Your answer:* 

22. **The popup needs an option to "change account". Should this button completely sign them out of Clerk and redirect them to the sign-in page?**
    * *Your answer:* 

23. **What should the exact text on the "Change Account" button be? (e.g., "Sign in with a different account", "Switch Account", or "Log Out")**
    * *Your answer:* 

24. **Should the blocked popup also include a link or an email address to "contact the admin"?**
    * *Your answer:* 

25. **If yes, what email address or support link should we use?**
    * *Your answer:* 

---

### **Section 4: Data Sync and Edge Cases**

26. **What happens if a blocked user's subscription expires while they are blocked? Should it auto-cancel, or just remain expired?**
    * *Your answer:* 

27. **If a user is unblocked, should their remaining subscription days be extended by the amount of time they were blocked?**
    * *Your answer:* 

28. **Should blocking a user also immediately revoke any active sessions they have open across all devices via Clerk?**
    * *Your answer:* 

29. **Should we keep an audit log of which specific admin blocked or unblocked the user, and when?**
    * *Your answer:* 

30. **Do you want an automated email notification to be sent to the user when their account is blocked or unblocked?**
    * *Your answer:* 
