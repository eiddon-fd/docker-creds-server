docker-creds-server
===================
[![Docker Badge](https://dockeri.co/image/eiddonfd/docker-creds-server)](https://hub.docker.com/r/eiddonfd/docker-creds-server)

DC/OS (which uses mesos under the hood) can use docker credentials if a service is configured with an "artifact URI" to download a `.dockercfg` file which contains docker credentials in a standard format.

If you don't have the enterprise edition then you cannot configure secrets on the DC/OS services so this server is designed to be deployed as an internally load balanced service and provides the correct file based on two environment variables

| Name  | Value                                                            |
|-------|------------------------------------------------------------------|
| AUTH  | HTTP auth string base64 encoded docker hub username and password |
| EMAIL | Email address of corresponding docker hub account                |

Building Locally
----------------

Changes to the `main` branch of this repo will be built automatically but you can also build and run this image locally.

```
docker build -t docker-creds-server .
```

Running Locally
---------------

```
docker run -d -e AUTH='SOMEAUTHSTRING' -e EMAIL='SOMEEMAILSTRING' -p 80:80 docker-creds-server

curl http://localhost/.dockercfg
#{"https://index.docker.io/v1/":{"auth":"SOMEAUTHSTRING","email":"SOMEEMAILSTRING"}}
```

Running on DC/OS
----------------

```
{
  "env": {
    "EMAIL": "SOMEEMAILSTRING",
    "AUTH": "SOMEAUTHSTRING"
  },
  "id": "/docker-creds-file-server",
  "backoffFactor": 1.15,
  "backoffSeconds": 1,
  "container": {
    "portMappings": [
      {
        "containerPort": 80,
        "hostPort": 0,
        "labels": {
          "VIP_0": "/docker-creds-file-server:80"
        },
        "protocol": "tcp",
        "servicePort": 10121
      }
    ],
    "type": "DOCKER",
    "volumes": [],
    "docker": {
      "image": "eiddonfd/docker-creds-server",
      "forcePullImage": false,
      "privileged": false,
      "parameters": []
    }
  },
  "cpus": 0.1,
  "disk": 0,
  "instances": 1,
  "maxLaunchDelaySeconds": 300,
  "mem": 128,
  "gpus": 0,
  "networks": [
    {
      "mode": "container/bridge"
    }
  ],
  "requirePorts": false,
  "upgradeStrategy": {
    "maximumOverCapacity": 1,
    "minimumHealthCapacity": 1
  },
  "killSelection": "YOUNGEST_FIRST",
  "unreachableStrategy": {
    "inactiveAfterSeconds": 0,
    "expungeAfterSeconds": 0
  },
  "healthChecks": [],
  "fetch": [],
  "constraints": []
}
```
