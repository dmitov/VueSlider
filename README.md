# Image Slider

## Installation
TBD

## Usage
```
<template>
  <div>
    <Slider 
        source="http://www.mocky.io/v2/5b753d5f2e00006900535f6c"
        width="100%"
        height="560px"
    >
    </Slider>
  </div>
</template>

<script>
import Slider from 'slider';

new Vue({
  el: '#app',
  components: {
    Slider
  }
});
</script>
```

## Props
| Prop        | Type          | Default  | Description  |
| ----------- |:--------------| ---------|--------------|
| source      | String        | http://www.mocky.io/v2/5b753d5f2e00006900535f6c     | Set the source for the images. |
| width       | String        | 100%     | Width of the component |
| height      | String        | 570px    | Height of the component |

## Project setup for development
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run unit tests
```
yarn run test:unit
```