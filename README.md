## Hume

Hume is an publisher customization app that will allow publishers to easily create themes for their stores.

## Get Started

```
$ git clone https://github.com/stacksocial/hume.git
$ cd hume
$ bundle install
$ rake db:migrate
$ npm install webpack -g
$ npm install

# Compile React app - keep this open in its own tab
$ npm run build

# Start server and see it at localhost:3000
$ rails s
```

**React app** on a **Rails app**.
* [Redux](https://github.com/reactjs/redux) to handle React state
* [Thunk](https://github.com/gaearon/redux-thunk) middleware to handle asynchronous calls in Redux
* [Tinycolor2](https://github.com/bgrins/TinyColor) for color scheme and color conflict detection

## Features

### for the publisher
1. Preview your color selection automatically
2. Don't see the font you want? Choose the 'Other' option and enter the URL of your desired font
3. Choose from five different color schemes based on your `brand-primary` color for inspiration
  * Populate any of your color fields with one of those colors by clicking on the preview swatch

### for us
1. Easily add or remove what fields a publisher can customize using the JSON config file
2. Compile the publisher's saved theme into a CSS file or a Sass file!
3. GET and PATCH to JSON API

## Technical Stuff

### JSON API
**`/app/resources/ap/v1/`**

Consists of a publisher resource and style resource.

*Example response:*

```
{
  "data": {
    "id": "1",
    "type": "styles",
    "attributes": {
      "style-attributes": {
        "variables": {
          "brand_primary": "#0275d8",
          "brand_success": "#5cb85c",
          "brand_warning": "#f0ad4e",
          "brand_danger": "#d9534f",
          "primary_font": "Helvetica",
          "secondary_font": "Arial"
        },
        "hello_bar": {
          "font": "Trebuchet",
          "color": "#373a3c"
        },
        "navbar": {
          "background_color": "#000",
          "color": "#ccc"
        }
      },
      "publisher-id": 1
    }
  }
}
```

---

### config.json
**`/react_app/config.json`**

Variables have attributes `name`, `type`, and `default`.

  * **name**: Displayed as label next to input
  * **type**: Field type - 'hex' for colors, 'selector' for fonts, & more to come

Components have attributes `name`, `className`, and `styles`.

  * **name**: Displayed as heading of ComponentModule
  * **id**: Class name used to identify it (..eventually change to `className` probably)
  * **styles**: Customizable fields for this component

Fields of a component have attributes `type` and `default` (`dependencies` optional).

  * **type**: Field type
  * **default**: Default value when field is first introduced
  * **dependencies**: Name of field that this field may be dependent on (i.e. color and background-color). Dependent is defined as may have conflicts with.

*Example config:*

```
{
  "variables": [
    {
      "name": "brand-primary",
      "type": "hex",
      "default": "#000"
    },
    {
      "name": "primary-font",
      "type": "selector",
      "default": "Arial"
    }
  ],
  "components": [
    {
      "name": "Hello Bar",
      "id": "hello-bar",
      "styles": {
        "font": {
          "type": "selector",
          "default": "Arial"
        },
        "color": {
          "type": "hex",
          "default": "#ccc"
        }
      }
    }
  ]
}
```

---

### CSS & Sass compiler
**`/app/services/`**

Style Resource has an `after_save` filter that compiles the file. Modify the compiler used between CSS (**StyleCompiler**) and Sass (**SassCompiler**).

* Compiles the variables into CSS or Sass variables and components into class name with fields.
* Outputs a file with an **MD5** signature.

*Example CSS output*

```
html {
  --brand-primary: #0275d8;
  --brand-success: #5cb85c;
  --brand-warning: #f0ad4e;
  --brand-danger: #d9534f;
  --primary-font: Helvetica;
  --secondary-font: Arial;
  .hello-bar {
    font: Trebuchet;
    color: #373a3c;
  }
  .navbar {
    font: Arial;
    background-color: #000;
    color: #ccc;
  }
}
```

*Example Sass output*

```
html {
  $brand-primary: #0275d8;
  $brand-success: #5cb85c;
  $brand-warning: #f0ad4e;
  $brand-danger: #d9534f;
  $primary-font: Helvetica;
  $secondary-font: Arial;
  .hello-bar {
    font: Trebuchet;
    color: #373a3c;
  }
  .navbar {
    font: Arial;
    background-color: #000;
    color: #ccc;
  }
}
```

---

### React Components
Organization:

* Hume
    * StyleForm
        * VariablesSection
            * ColorMaster
                * ColorInput
                * SelectInput (for color scheme)
                * ColorSchemeModule (colors generated in the color scheme)
            * HexFields
                * ColorInput
            * SelectFields
                * SelectInput
        * ComponentsSection
            * ComponentModule
                * ColorInput
                * SelectInput


