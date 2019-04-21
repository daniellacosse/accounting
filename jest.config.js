module.exports = {
  coverageThreshold: {
    global: {
      /*
       * I want to test most paths without being too obnoxious. The rationale I'm trying out
       * is as follows -
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
       * of depth are for simple type-checking.
       *
       * As our default debugging solution is in the tests, this will give us ample entry points
       * into the inspector
       */
      branches: 87.5
    }
  }
};
