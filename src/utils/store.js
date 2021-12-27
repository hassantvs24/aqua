import { createRef } from "react";

const state = {
  sections: 60,
  pages: 6,
  zoom: 75,
  paragraphs: [
    {
      offset: 1,
      factor: 1.75,
      aspect: 1.51,
    },
    {
      offset: 2,
      factor: 2.0,
      aspect: 1.5,
    },
    {
      offset: 3,
      factor: 2.25,
      aspect: 1.5037,
    },
    {
      offset: 4,
      factor: 2.0,
      aspect: 0.665,
    },
    {
      offset: 5,
      factor: 1.75,
      aspect: 1.55,
    },
  ],
  top: createRef(),
};

export default state;
