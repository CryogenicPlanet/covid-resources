# Covid 19 Resource Repository

This is a general repo not for any specific city but rather any city, fork this repo for other cities

[![Run on repl.it](https://repl.it/badge/github/CryogenicPlanet/covid-bangalore-resources)](https://covid-bangalore-resources.cryogenicplanet.repl.co)

There are lot of collections of valuable data but keeping it an open source place like this makes it much better to search and not duplicate.

## Data

All the data is in the `_data` folder, everything else is just the client to display the data

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

## Cloning for other cities

This should ideally be cloned for every city with its own data, which makes it most useful. Maybe even for smaller communities within a city.

Set the `NEXT_PUBLIC_CITY_NAME` in `.env.local` to the name of your city

## Git Integration

You can setup automatic git updates every hour by adding `WORKER_ACCOUNT`,`WORKER_PASSWORD` and `REPO_URL` to the `.env.local` file.

**For simplicity, please ensure `REPO_URL` does not have `https://` so it should be like `github.com/CryogenicPlanet/covid-bangalore-resources.git`**

While these can be the name and password of your main github account, I would recommend setting up a smurf account just for grunt work which can push these changes

## Development

### Getting Started

Set the variables in `.env.example` and move them to `.env.local`

```
pnpm install # Faster node package manager
pnpm dev # Next dev
```
