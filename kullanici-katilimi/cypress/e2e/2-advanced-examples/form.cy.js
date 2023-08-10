describe("Form", () => {
    it("submits the form successfully with valid inputs", () => {
      cy.visit("http://localhost:3000/"); // test edilecek form sayfasını ziyaret ediyoruz.
  
      // formdaki inputları doldurulmasını aşağıdaki gibi sağlıyoruz.
      cy.get('input[name="first_name"]').type("Emre");
      cy.get('input[name="last_name"]').type("Öztürk");
      cy.get('input[name="email"]').type("emre@example.com");
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="term"]').check();
  
      // formun gönderilmesini aşağıdaki gibi sağlıyoruz.
      cy.get("form").submit();
    });
  
    it("displays an error message when email is already registered", () => {
      cy.visit("http://localhost:3000/");
  
      // önceden kaydedilmiş bir e-postayı kullanarak formun doldurulmasını sağlıyoruz.
      cy.get('input[name="first_name"]').type("Emre");
      cy.get('input[name="last_name"]').type("Öztürk");
      cy.get('input[name="email"]').type("emre@example.com"); // önceden kaydedilmiş e-posta
      cy.get('input[name="password"]').type("password123");
      cy.get('input[name="term"]').check();
  
      // formun gönderilmesi
      cy.get("form").submit();
  

    });
  
    // boş form göndrilmeye çalışırsa aşağıdaki gibi hata mesajlarının görüntülenmesini sağlıyoruz.
    it("displays an error message when form is submitted with empty inputs", () => {
      cy.visit("http://localhost:3000/");
  
      // boş formu gönder
      cy.get("form").submit();
  
      // gerekli alan hataları görüntülenir
      cy.contains("First Name is required");
      cy.contains("Last Name is required");
      cy.contains("Email is required");
      cy.contains("Password is required");
      cy.contains("You must accept the terms and conditions");
    });
  });