import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  SubnetType,
} from "aws-cdk-lib/aws-ec2";

export class LearningAwsVpcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "learning-aws-vpc", {
      vpcName: "my-vpc",
      cidr: "10.0.0.0/26",
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: "private-subnet",
          subnetType: SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 28,
        },
        {
          name: "public-subnet",
          subnetType: SubnetType.PUBLIC,
          cidrMask: 28,
        },
      ],
    });

    const securityGroup = new ec2.SecurityGroup(this, "sg", {
      vpc,
      securityGroupName: "learning-aws-vpc-sg",
      allowAllOutbound: true,
    });

    new ec2.Instance(this, "private-server", {
      instanceName: "private-server",
      vpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_WITH_NAT,
      },
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE2,
        InstanceSize.NANO
      ),
      machineImage: new ec2.AmazonLinuxImage(),
      securityGroup,
    });

    new ec2.Instance(this, "public-server", {
      instanceName: "public-server",
      vpc,
      vpcSubnets: {
        subnetType: SubnetType.PUBLIC,
      },
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE2,
        InstanceSize.NANO
      ),
      machineImage: new ec2.AmazonLinuxImage(),
      securityGroup,
    });
  }
}
