Feature: E-commerce Validations
@Regression
  Scenario: Placing the order
  Given login to ecommerce application using "g.rajanaidu49@gmail.com" and "Awesome@123"
  When i add "iphone 13 pro" to the cart
  Then verify "iphone 13 pro" is displayed in cart
  When enter valid details and place the order
  Then verify order is present in order history.


@Validations
  Scenario Outline: Failing the order
    Given login to ecommerce2 application using "<username>" and "<password>"
    Then error message is displayed

    Examples:
      | username             | password            |
      | rahulshettyacademy2   | Learning@830$3mK2   |
      | rahulshettyacademy1  | Learning@830$3mK2   |
      | rahaulacademy        | Donking@12          |
      
    