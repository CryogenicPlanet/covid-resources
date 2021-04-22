# Covid 19 Resource Repository
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Run on repl.it](https://repl.it/badge/github/CryogenicPlanet/covid-resources)](https://repl.it/github/CryogenicPlanet/covid-resources}&ref=button)

This is a general repo not for any specific city but rather any city, fork this repo for other cities

There are lot of collections of valuable data but keeping it an open source place like this makes it much better to search and not duplicate.

# Getting Started

Set the variables in `.env.example` and move them to `.env.local`

```
yarn install
yarn build
```

# Cities

List of exisiting cities that have repository with data

| City Name | Link to repo                                                 | Link to deployment                                         |
| --------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| Bangalore | https://github.com/CryogenicPlanet/covid-bangalore-resources | https://covid-bangalore-resources.cryogenicplanet.repl.co/ |
| Jabalpur (M.P.) | https://github.com/Siddhant-K-code/Jabalpur-covid-resources | https://jabalpur-covid-resources.siddhantkcode.repl.co/ |
| Bhoapl (M.P.) | https://github.com/Siddhant-K-code/Bhopal-covid-resources | https://bhopal-covid-resources.siddhantkcode.repl.co/ |

# Cloning for other cities

This should ideally be cloned for every city with its own data, which makes it most useful. Maybe even for smaller communities within a city.

1. Fork this repo
2. Set all the enviroment variables in `.env.example`
3. Recommend using [repl.it](https://repl.it) for deployment
4. Add your repo and deployment link to the table above!

## Enviorment Variables

`NEXT_PUBLIC_CITY_NAME` is the name of your city.

P.S : `NEX_PUBLIC_ENV` is just the way nextjs allows env variables to be accessible in the dom, nothing else.

### Captcha

Generate your captcha secrets [here](https://g.co/recaptcha/v3) using recaptha v2

1.  `CAPTCHA_SECRET` This is the captcha secret google give you
2.  `NEXT_PUBLIC_CAPTHA_SITE_KEY` This is the captcha site key

### Git Integration

You can setup automatic git updates every hour by adding `WORKER_ACCOUNT`,`WORKER_PASSWORD` and `REPO_URL` to the `.env.local` file.

**For simplicity, please ensure `REPO_URL` does not have `https://` so it should be like `github.com/CryogenicPlanet/covid-bangalore-resources.git`**

While these can be the name and password of your main github account, I would recommend setting up a smurf account just for grunt work which can push these changes

# Data

All the data is in the `_data` folder, everything else is just the client to display the data.

_This repository has no data itself, all the data will be in city specific repositories_

The idea with open sourcing the data is, this data can be used for more complex application which verifiy sources or such without having to worry about collecting the data again.

### Adding data programatically

The data is in the format of the following

```typescript
type DataType = {
  uuid: string // use a uuid library
  name: string
  description: string
  contact: string
  lastVerified: number // should be -1 by default
}
```

While adding them programatically, we can directly modify the `json` files inside the `_data` folder depending on the category.(Uncategorized should go into other). Each json files is structured like the following

```
{
  "data": [
    {
      // Object of DataType here
      // lastVerified should be set to -1 by default
      // uuid should ideally be a random unique id
    }
  ]
}
```

Any language can be used to programtically writing to these `json` files, I would recommend `python`. Once the data is written, just make a PR and I will merge it as soon as possible.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
