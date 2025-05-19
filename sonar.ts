import scanner from 'sonarqube-scanner';

scanner(
  {
    serverUrl: 'http://localhost:9000',
    options: {
      'sonar.projectKey': 'staff_shit_palnner_backend',
      'sonar.sources': 'src',
      'sonar.exclusions': '**/node_modules/**,dist/**,build/**,**/*.spec.ts,**/*.test.ts',
      'sonar.language': 'ts',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.javascript.tsconfigPath': 'tsconfig.json',
      // 'sonar.login': 'sqa_fb23538d038f9a10663ecc948fcbd8bbf4e969d0',
      'sonar.login': 'sqa_d1ac6fb59cb0f544d3f2db319af4ae09ea5b1cfa',
    },
  },
  () => process.exit()
);