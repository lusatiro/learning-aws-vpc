import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { SubnetType } from "aws-cdk-lib/aws-ec2";

export class LearningAwsVpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ec2.Vpc(this, "my-vpc", {
      vpcName: "lucas-vpc",
      cidr: "10.0.0.0/26",
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: "my-private-subnet",
          subnetType: SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 28,
        },
        {
          name: "my-public-subnet",
          subnetType: SubnetType.PUBLIC,
          cidrMask: 28,
        },
      ],
    });
  }
}
