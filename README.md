
# Difference generator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/Ilka228/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Ilka228/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/933d6f84e1a35a54c17d/maintainability)](https://codeclimate.com/github/Ilka228/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/933d6f84e1a35a54c17d/test_coverage)](https://codeclimate.com/github/Ilka228/frontend-project-lvl2/test_coverage)
![Node CI](https://github.com/Ilka228/frontend-project-lvl2/workflows/github-actions/badge.svg)


### Conosle utility for config files comparation

To **compare** files type **`gendiff './pathOne' '../pathTwo'`** into the terminal. You can use **absolute file pathes** as well as **relative** ones

### Usage options
  

#### JSON and YAML files comparation
To compare **JSON** or **YAML** files type **`gendiff './pathOne' '../pathTwo'`** where `'./pathOne'` and `'../pathTwo'` your file pathes
<br/> You can compare  two **JSON** or two **YAML** files **only**

#### Output formats
##### Plain
To get plain output format type **`gendiff --format plain './pathOne' '../pathTwo'`**

##### Stylish
To get stylish output format type **`gendiff --format stylish './pathOne' '../pathTwo'`**

##### JSON
To get JSON output format type **`gendiff --format json './pathOne' '../pathTwo'`**

