Feature: E-commerce2 Validations
@Validations
  Scenario Outline: Failing the order
    Given login to ecommerce2 application using "<username>" and "<password>"
    Then error message is displayed

    Examples:
      | username             | password            |
      | rahulshettyacademy2   | Learning@830$3mK2   |
      | rahulshettyacademy1  | Learning@830$3mK2   |
      | rahaulacademy        | Donking@12          |
      