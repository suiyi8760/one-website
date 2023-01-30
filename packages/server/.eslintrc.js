module.exports = {
  root: true,
  extends: ['@fedevlab/eslint-config/ts'],
  parserOptions: {
    project: ['./tsconfig.json']
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        // pretty mouch scene can use type inference, personally prefer to turn off
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-floating-promises": "off"
      }
    }
  ]
}
