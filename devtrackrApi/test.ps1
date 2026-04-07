$baseUrl = 'http://localhost:3000'
$user = @{
  email = 'testuser2@example.com'
  password = 'password123'
}

try {
    $registerRes = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body ($user | ConvertTo-Json) -ContentType 'application/json'
    Write-Host "Register:"
    $registerRes | ConvertTo-Json
} catch {
    Write-Host "Register Error: $_"
}

try {
    $loginRes = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body ($user | ConvertTo-Json) -ContentType 'application/json'
    Write-Host "Login:"
    $loginRes | ConvertTo-Json

    $token = $loginRes.data.access_token
    $headers = @{ Authorization = "Bearer $token" }

    $incomeData = @{
      amount = 1000
      description = 'Salary'
      date = '2026-04-01T00:00:00Z'
    }
    $incomeRes = Invoke-RestMethod -Uri "$baseUrl/income" -Method Post -Body ($incomeData | ConvertTo-Json) -ContentType 'application/json' -Headers $headers
    Write-Host "Create Income:"
    $incomeRes | ConvertTo-Json

    $getIncomeRes = Invoke-RestMethod -Uri "$baseUrl/income" -Method Get -Headers $headers
    Write-Host "Get Income:"
    $getIncomeRes | ConvertTo-Json

    $categories = Invoke-RestMethod -Uri "$baseUrl/categories" -Method Get
    Write-Host "Categories:"
    $categories | ConvertTo-Json

    if ($categories.Count -gt 0) {
        $expenseData = @{
          amount = 200
          description = 'Groceries'
          date = '2026-04-02T00:00:00Z'
          categoryId = $categories[0].id
        }
        $expenseRes = Invoke-RestMethod -Uri "$baseUrl/expenses" -Method Post -Body ($expenseData | ConvertTo-Json) -ContentType 'application/json' -Headers $headers
        Write-Host "Create Expense:"
        $expenseRes | ConvertTo-Json
    } else {
        Write-Host "No categories found!"
    }

    $getExpenseRes = Invoke-RestMethod -Uri "$baseUrl/expenses" -Method Get -Headers $headers
    Write-Host "Get Expenses:"
    $getExpenseRes | ConvertTo-Json

    $summaryRes = Invoke-RestMethod -Uri "$baseUrl/summary" -Method Get -Headers $headers
    Write-Host "Summary:"
    $summaryRes | ConvertTo-Json

} catch {
    Write-Host "Error: $_"
}