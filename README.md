### OpenSOP (standad operating procedure)

#### SIGNIFICANCE

This software is an open source tool that provides a standard operating procedure (SOP)  system; It can use scientific experiments with iPad for clean room use.

![OpenSOP](https://regmed.hgc.jp/sop_manual/images/image25.png "OpenSOP")

---

#### INTRODUCTION
In a life science and biomedical field, a researcher, a medical doctor needs a standard operating procedure (SOP) software that consider a clean room use for planning an experimental method. Experiment supervisor such as group leader, professor, the senior director needs paper-based SOP management because they are required approval by bioethics judgment​ committee in each organization. A supervisor does not write a detail experimental document; an editor probably writes an SOP over a discussion with their supervisor. Besides a technician is required accurately a sensitive operation in their work, and they can not bring a paper document into a clean room for the maintenance of clean air condition. We improved graphical user interface (GUI) for simple accuracy-operation about SOP in clean-room work. On the other hand, our proposal SOP can quickly archive and share on the Web browser, which have succeeded suitable integration for SOP lifecycle. So we propose the novel open source SOP platform that is structured by the SOP server and the SOP client for the tablet PC such as iPad.

![SOP](https://regmed.hgc.jp/sop_manual/images/image27.png "OpenSOP")

---

#### INSTALL

##### Preparation of Docker for Mac OSX

* M-1. Install "Command Line Tools for Xcode".
```
$ xcode-select --install
```
* M-2. Install a package management system of "Homebrew".
http://brew.sh/index.html (Link to other Website)
```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
* M-3. Update the package of Homebrew. 
```
$ brew update
$ brew upgrade
```
* M-4. Install application of "VirtualBox". https://www.virtualbox.org/wiki/Downloads (Link to other Website)
* M-5. Install Boot2Docker and Docker.
```
$ brew install boot2docker docker
```
* M-6. Upgrade Boot2Docker.
```
$ boot2docker upgrade
```
* M-7. Check the IP address assigned using the command of Boot2Docker.
```
$ boot2docker ip
```

---

##### Preparation of Docker for Windows
* W-1. Install application of "Windows Docker Client".
https://docs.docker.com/installation/windows/ (Link to other Website)
https://github.com/boot2docker/windows-installer/releases (Link to other Website)
Boot2Docker, Boot2Docker Management Tool, Docker, VirtualBox, msysGit are installed
* W-2. Start Boot2Docker from the start menu.
* W-3. Make a note of the IP address and PORT of DOCKER_HOST displayed at the time of starting. 


##### Preparation of Docker for Linux
* LC-0. Install Docker from EPEL of Fedora in CentOS 6. (don't need after version 6.5) 
```
$ sudo rpm -ivh http://ftp.riken.jp/Linux/fedora/epel/6/x86_64/epel-release-6-8.noarch.rpm
```
* LC-1. Update package of yum.
```
$ sudo yum update
```
* LC-2. Install Docker.
```
$ sudo yum install docker-io         (in case CentOS 6)
$ sudo yum install docker            (in case CentOS 7)
```
* LC-3. Set up to start Docker at the time of boot of CentOS. 
```
$ sudo chkconfig docker on
```
* LC-4. Start Docker service.
```
$ sudo /etc/rc.d/init.d/docker start
```
* LC-5. Inspect an IP address, in order to access from a browser to a Web server. (Please check the docker0 using ifconfig command.)

##### Common process of remote installation for Image Annotation Viewer from Docker Hub
* C-0. Register your account into Docker Hub.
https://registry.hub.docker.com/ (Link to other Website)
* C-1. If you encounter the message of "Cannot connect to the Docker daemon. Is 'docker -d' running on this host?" then you execute next command.
```
$ export $(boot2docker shellinit)
```
* C-2. login to Docker Hub.
```
$ docker login
```
* C-3. Pull container image of annotation image viewer from Docker Hub.
```
$ docker pull komiyama/sop
```
* C-4. Check an information of container image.
```
$ docker images
```
* C-5. Start a container as a daemon and assign HTTP port to the container.
```
$ docker run -t -i -d -p 10080:80 --name sop komiyama/sop
```
* C-6. Check a started container.
```
$ docker ps -a
```
* C-7. Access http://DOCKER_HOST:PORT/sop via a browser. 
Example: http://192.168.59.103:10080/sop
* C-8. Default user accounts were registered as each user roles. 
* C-9. Set up the CONTAINER ID into an option parameter of docker stop command at the termination of a container.
```
$ docker stop CONTAINER_ID
```


##### Common process of local installation for Standar Operating Procedure from Docker Images of TAR file
* C'-1. If you encounter the message of "Cannot connect to the Docker daemon. Is 'docker -d' running on this host?" then you execute next command.
```
$ export $(boot2docker shellinit)
```
* C'-2. Download the TAR file of container image of annotation image viewer from our Web site.https://regmed.hgc.jp/docker/StandardOperatingProcedure_latest.tar
* C'-3. Load the TAR file into your docker.
```
$ docker load -i /YOUR/FILE/PATH/StandardOperatingProcedure_latest.tar
```
* C'-4. Check an information of container image.
```
$ docker images
```
* C'-5. Set a human readable tag to the loaded SOP image.
```
$ docker tag IMAGE_ID komiyama/sop:latest
```
* C'-6. Start a container as a daemon and assign HTTP port to the container.
```
$ docker run -t -i -d -p 10080:80 --name sop komiyama/sop
```
* C'-7. Check a sturted container.
```
$ docker ps -a
```
* C'-8. Access http://DOCKER_HOST:PORT/sop via a browser. 
Example: http://192.168.59.103:10080/sop
* C'-9. Default user accounts were registered as each user roles. 
* C'-10. Set up the CONTAINER ID into an option parameter of docker stop command at the termination of a container.
```
$ docker stop CONTAINER_ID
```

#### USAGE
You can read user manual, please visit the [OpenSOP homepage](https://regmed.hgc.jp/sop.html) and [document page](https://regmed.hgc.jp/sop_manual/sop_manual.html).

