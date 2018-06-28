const puppeteer = require("puppeteer")

let scrape = async () => {
	const browser = await puppeteer.launch({
		// headless - use false on native shells, true in WSL
		// headless: false,
		headless: true,
		// use --no-sandbox flag in WSL
		args: ['--no-sandbox'],
	})
	const page = await browser.newPage()

	await page.goto("http://books.toscrape.com/")
	await page.waitFor(1000)

	await page.click("li.col-xs-6:nth-child(1) > article:nth-child(1) > h3:nth-child(3) > a:nth-child(1)")
	const result = await page.evaluate(() => {
		let title = document.querySelector("h1").innerText
		let price = document.querySelector(".price_color").innerText

		return {
			title,
			price
		}
	})

	await page.close()
	await browser.close()
	return result
}

scrape().then(value => {
	console.log(value);
})