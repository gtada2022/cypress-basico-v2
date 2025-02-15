/// <reference types="Cypress" />
describe('Central de Atendimento ao Cliente TAT', function () {
    this.beforeEach(function () {
        cy.visit('/src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Preenche os campos obrigatorios e envia o formulário', function () {
        const longText = 'Teste,testeanjnsnfndsnfdnsifsnjfnsnfdsjfndnsfnjdnsfnndsnfjdnsjnfjknsdfjknsjknfjndsjkdnfjksdnjfndjksnfjnjdsndfjksnjdfnjdksnjfnjnsjfnjksnfkjndskjfndsjnsdjnskdnkjfnjskf'
        cy.get('#firstName').type('George')
        cy.get('#lastName').type('Tada')
        cy.get('#email').type('george.tada@hotmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })
    it('Preencher com email invalido', function () {

        cy.get('#firstName').type('George')
        cy.get('#lastName').type('Tada')
        cy.get('#email').type('george.tada@hotmail,com')
        cy.get('#open-text-area')
            .type('tes')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')



    })
    it('Validar campo telefone numerico', function () {
        cy.get('#phone')
            .type('ahdjkskdksa')
            .should('have.value', '')

    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {


        cy.get('#firstName').type('George')
        cy.get('#lastName').type('Tada')
        cy.get('#email').type('george.tada@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')


    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('George')
            .should('have.value', 'George')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Tada')
            .should('have.value', 'Tada')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('george.tada@hotmail.com')
            .should('have.value', 'george.tada@hotmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('123345678')
            .should('have.value', '123345678')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
            .should('have.value', '')

    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    it('Crie um novo teste chamado seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })
    it('Seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')

    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"][value="elogio"]')
            .check()
            .should('have.value', 'elogio')
        cy.get('input[type="radio"][value="ajuda"]')
            .check()
            .should('have.value', 'ajuda')

    })
    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

            })

    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {

        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

            })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                // console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')

            })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy  a').should('have.attr', 'target', '_blank')


    })
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy  a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

})