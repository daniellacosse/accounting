module.exports = {
  coverageThreshold: {
    global: {
      /*
       * The rationale I'm trying out here is as follows -
       *
       * O
       * | - - - - - \
       * O           O               > first-level if statement
       * | - - \     | - - \
       * O     O     O     O         > second-level condition(s)
       * | - \ | - \ | - \ | - \
       * O   O O   O O   O O ((X))   > terniaries. (7/8 = 87.5)
       *
       * Individual functions shouldn't have more branches than this
       * unless it's in very extreme cases. Oftern terniaries at this level
       * of depth are for simple type-checking. I want to test most paths without
       * being too obnoxious.
       */
      branches: 87.5
    }
  }
};
