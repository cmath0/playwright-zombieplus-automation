const { test, expect } = require('../support')
const { executeSQL } = require('../support/database')

const data = require('../support/fixtures/tvshows.json')

test('deve permitir cadastrar uma série', async ({ page }) => {
    const tvShow = data.create

    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvShow.title}'`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.visit()
    await page.tvshows.create(tvShow)

    await page.popup.haveText(`A série '${tvShow.title}' foi adicionada ao catálogo.`)
})

test('deve permitir remover uma série', async ({ page, request }) => {
    const tvShow = data.to_remove

    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvShow.title}'`)
    await request.api.postTvShow(tvShow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.visit()
    await page.tvshows.remove(tvShow.title)
    await page.popup.haveText('Série removida com sucesso.')
})

test('não deve cadastrar série com título duplicado', async ({ page, request }) => {
    const tvShow = data.duplicate

    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvShow.title}'`)
    await request.api.postTvShow(tvShow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.visit()
    await page.tvshows.create(tvShow)

    await page.popup.haveText(
        `O título '${tvShow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`
    )
})

test('não deve cadastrar ao não preencher todos os campos obrigatórios', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.visit()
    await page.tvshows.goForm()
    await page.tvshows.submit()

    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)',
    ])
})

test('deve buscar séries pelo termo zombie', async ({ page, request }) => {
    const tvShows = data.search

    const tvShowNames = tvShows.data.map(show => `'${show.title}'`).join()
    await executeSQL(`DELETE FROM tvShows WHERE title IN(${tvShowNames})`)
    
    tvShows.data.forEach(async (show) => {
        await request.api.postTvShow(show)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.visit()
    await page.tvshows.search(tvShows.input)

    tvShows.outputs.forEach(async (output) => {
        await page.tvshows.tableHave(output)
    })

    await page.tvshows.tableNotHave(tvShows.shouldNotReturn)
})