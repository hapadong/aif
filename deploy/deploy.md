``` sh
# install node
sudo dnf module list nodejs
sudo dnf module enable nodejs:22
sudo dnf install -y nodejs
node --version

# add user
useradd --system --no-create-home --shell /sbin/nologin aif
# copy tar to /opt/aif
chown -R aif:aif aif/

# make system daemon
vim /etc/systemd/system/aif.service
systemctl daemon-reload
systemctl enable aif
systemctl start aif
systemctl status aif
journalctl -u aif
sudo ss -tulpn | grep 3000
sudo firewall-cmd --list-ports
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports

```