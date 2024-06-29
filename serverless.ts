import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "goldmak-iac-aws",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    region: "us-east-2",
    stage: "${opt:stage, 'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  resources: {
    Resources: {
      goldmakS3Bucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "goldmak.s3.bucket",
          PublicAccessBlockConfiguration: {
            BlockPublicPolicy: true,
          },
        },
      },
    },
    Outputs: {
      goldmakS3BucketName: {
        Value: { Ref: "goldmakS3Bucket" },
      },
      goldmakS3BucketArn: {
        Value: { "Fn::GetAtt": ["goldmakS3Bucket", "Arn"] },
      },
    },
  },
  // import the function via paths
  functions: {},
  package: { individually: true },
};

module.exports = serverlessConfiguration;
