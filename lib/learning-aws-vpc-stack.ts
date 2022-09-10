import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  MachineImage,
  SubnetType,
} from "aws-cdk-lib/aws-ec2";
import { MachineImageType } from "aws-cdk-lib/aws-ecs";

export class LearningAwsVpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "my-vpc", {
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

    new ec2.Instance(this, "my-instance", {
      vpc,
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE2,
        InstanceSize.NANO
      ),
      machineImage: new ec2.AmazonLinuxImage(),
    });
  }
}
