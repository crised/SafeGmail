SafeGmail
=========

// Software released under GNU GENERAL PUBLIC LICENSE.

Browser extension easy to use to provide PGP like encryption to Gmail� users.

This project consist in e-mail encryption in both client and safegmail server side.

PGP keys are handled by the server.

Goals of the project are:

1. Maximum security so message is never revealed to the server.

2. Follow OpenPGP standard as close as possible providing easy to use features. 

3. Open Source project to assure transparency. 

Flow Diagram: 

Sender flow

1. Generate AES message key at client side. 

2. Encrypt mail content with AES message key at client side.

3. Invoke server for getting the unique messageid by passing on question, answer, recepientId and messagekey as request arguments.

(notice that e-mail body is not transferred to server)

4. Server side encryption for message key and recepient privatekey with hashed answer.

Receiver flow

1. Click on message link then answer question correctly in decryption webpage, then Copy & Paste e-mail body. 

2. Invoke server for fetching AES message key to decrypt the message.

3. Server side decryption logic to return decrypted message key to client side.

4. AES JS decryption of the copied & pasted message.
