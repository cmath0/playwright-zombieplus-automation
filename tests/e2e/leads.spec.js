const { test, expect } = require('@playwright/test')
const { faker } = require('@faker-js/faker')

const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
});

test('não deve cadastrar ao informar um email inválido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Matheus Cardoso', 'mcardoso.teste.com')

  await landingPage.alertHaveText('Email incorreto')
});

test('não deve cadastrar quando nome não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'mcardoso.teste@teste.com')

  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando email não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Matheus Cardoso', '')

  await landingPage.alertHaveText('Campo obrigatório')
});

test('não deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório', 
    'Campo obrigatório'
  ])
});
