[
  {
    id: "a61af889140c16b00ab9493cb878361a",
    value: {
      actionRequests: [
        {
          name: "refund",
          args: {
            emails: ["email_001", "email_003", "email_005", "email_009"],
          },
          description:
            'Refund pending approval\n\nTool: refund\nArgs: {\n  "emails": [\n    "email_001",\n    "email_003",\n    "email_005",\n    "email_009"\n  ]\n}',
        },
      ],
      reviewConfigs: [
        {
          actionName: "refund",
          allowedDecisions: ["approve", "edit", "reject"],
        },
      ],
    },
  },
];



`
'Refund pending approval

Tool: refund
Args: {"emails": ["email_001","email_003","email_005","email_009"]}'

Choose: 
1. approve
2. reject
`