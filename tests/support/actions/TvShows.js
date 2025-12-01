const { expect } = require('@playwright/test')

export class TvShows {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.locator('a[href$="tvshows"]').click()

        await expect(this.page.getByRole('heading', { name: 'Séries de TV' })).toBeVisible()
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' })
            .click()
    }

    async create(tvShow) {
        await this.goForm()

        await expect(this.page.locator('header h1')).toHaveText('Cadastrar nova Série')

        await this.page.getByLabel('Titulo da série').fill(tvShow.title)
        await this.page.getByLabel('Sinopse').fill(tvShow.overview)
        
        await this.page.locator('#select_company_id .react-select__indicator')
            .click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: tvShow.company })
            .click()
        
        await this.page.locator('#select_year .react-select__indicator')
            .click()
        await this.page.locator('.react-select__option')
            .filter({ hasText: tvShow.release_year })
            .click()
        
        await this.page.getByLabel('Temporadas').fill(tvShow.season.toString())

        await this.page.locator('input[name="cover"]')
            .setInputFiles('tests/support/fixtures' + tvShow.cover)
        
        if (tvShow.featured) {
            await this.page.locator('.featured .react-switch')
                .click()
        }
        
        await this.submit()
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)
        
        await this.page.click('.actions button')
    }

    async tableHave(tvShowName) {
        const resultTvShowNames = this.page.getByRole('row').locator('.title')

        await expect(resultTvShowNames.getByText(tvShowName)).toBeVisible()
    }

    async tableNotHave(tvShowName) {
        const resultTvShowNames = this.page.getByRole('row').locator('.title')

        await expect(resultTvShowNames.getByText(tvShowName)).not.toBeVisible()
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click()
        await this.page.click('.confirm-removal')
    }
}