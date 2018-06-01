# PTable

View live site here [theptable.com](http://theptable.com)

The internet was in desperate need for a modern day Periodic Table of Elements on the web, so I decided to create one.

This shows the elements in a table and a list. You can search elements and view elemental states based on a given temperature.

## Searching

You can search by a keyword or you can prefix with a property to refine your search.

For example, `type: Noble Gas` would search for all elements with the type Noble Gas.

The following prefixes can be used:

* `atomic-name`
* `atomic-number`
* `symbol`
* `type`

## References

* Atomic Mass taken from [wiki](https://en.wikipedia.org/wiki/Periodic_table)
* Electronegativity taken from [wiki](https://en.wikipedia.org/wiki/Electronegativity)
* Electron Configurations taken from [wiki](https://en.wikipedia.org/wiki/Electron_configurations_of_the_elements_(data_page))
* Ionization Energies taken from [wiki](https://en.wikipedia.org/wiki/Ionization_energies_of_the_elements_(data_page))

## TODO

* [x] Implement element popover on hover (not out of the box with reactstrap)
* [x] Set atomic mass to 4 significant figures
* [x] Add [Electronegativities](https://en.wikipedia.org/wiki/Electronegativity)
* [x] Add [Electron configuration](https://opentextbc.ca/chemistry/wp-content/uploads/sites/150/2016/05/CNX_Chem_06_04_Ptableconf.jpg)
* [x] Add [Ionization Energies](https://www.lenntech.com/periodic-chart-elements/ionization-energy.htm)
* [x] Fix strange input behavior on mobile (iOS)
* [x] Add github link in footer
* [x] Remove white space on mobile so there is no scrolling if it all fits on one screen
* [x] Make temp unit selectable between kelvins, celsius or fahrenheit
* [x] Implement Redux
* [ ] Add clear button next to text fields
