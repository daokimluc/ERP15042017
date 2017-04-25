﻿app.controller('BanHangCtrl', function ($http, $scope, BanHangService) {
    $scope.Detail = {
        ListAdd: [],
        ListNew: []
    }
    $scope.Detail.ListAdd = [{

    }];

    var salehienthoi = $('#username').val();

    $scope.load_donbanhang = function () {
        BanHangService.get_donbanhang().then(function (a) {
            $scope.list_donbanhang = a;
        });
    };
    $scope.load_donbanhang();

    $scope.load_thongtinchung_banhang = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //
        BanHangService.get_thongtinchung_donbanhang(url).then(function (abc) {
            $scope.thongtinchung = abc;

            BanHangService.get_thongtinchitiet_donbanhang(url).then(function (b) {
                $scope.Detail.ListAdd = b;

                var tong_tien_hang = 0;
                var tong_tien_thue_GTGT = 0;
                var tong_tien_thanh_toan = 0;

                for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
                    tong_tien_hang = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_HANG + tong_tien_hang);
                    tong_tien_thue_GTGT = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
                    tong_tien_thanh_toan = parseFloat($scope.Detail.ListAdd[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
                }
                $scope.tong_tien_hang = tong_tien_hang;
                $scope.tong_tien_thue_GTGT = tong_tien_thue_GTGT
                $scope.tong_tien_thanh_toan = tong_tien_thanh_toan;
                $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thanh_toan);
            });
        });
    };

    $scope.kiemtra = function (item) {
        $scope.item = item;

        var tong_tien_hang = 0;
        var tong_tien_thue_GTGT = 0;
        var tong_tien_thanh_toan = 0;

        $scope.item.THANH_TIEN_HANG = parseFloat($scope.item.DON_GIA * $scope.item.SO_LUONG);
        $scope.item.TIEN_THUE_GTGT = parseFloat($scope.item.THANH_TIEN_HANG * ($scope.item.THUE_GTGT / 100));
        $scope.item.TIEN_THANH_TOAN = $scope.item.THANH_TIEN_HANG + $scope.item.TIEN_THUE_GTGT;

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {
            tong_tien_hang = parseFloat($scope.Detail.ListAdd[i].THANH_TIEN_HANG + tong_tien_hang);
            tong_tien_thue_GTGT = parseFloat($scope.Detail.ListAdd[i].TIEN_THUE_GTGT + tong_tien_thue_GTGT);
            tong_tien_thanh_toan = parseFloat($scope.Detail.ListAdd[i].TIEN_THANH_TOAN + tong_tien_thanh_toan)
        }
        $scope.tong_tien_hang = tong_tien_hang;
        $scope.tong_tien_thue_GTGT = tong_tien_thue_GTGT
        $scope.tong_tien_thanh_toan = tong_tien_thanh_toan;
        $scope.so_tien_viet_bang_chu = docso($scope.tong_tien_thanh_toan);
    };


    $scope.saveBH = function () {
        //this gets the full url
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //

        var data_save = {
            MA_SO_BH: url,
            NGAY_BH: $scope.thongtinchung[0].NGAY_BH.format('DD/MM/YYYY'),
            MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
            TEN_LIEN_HE: $scope.thongtinchung[0].TEN_LIEN_HE,
            HINH_THUC_THANH_TOAN: $scope.thongtinchung[0].HINH_THUC_THANH_TOAN,
            TONG_TIEN_HANG: $scope.tong_tien_hang,
            TONG_TIEN_THUE_GTGT: $scope.tong_tien_thue_GTGT,
            TONG_TIEN_THANH_TOAN: $scope.tong_tien_thanh_toan,
            SO_TIEN_VIET_BANG_CHU: $scope.so_tien_viet_bang_chu,
            NGAY_GIAO_HANG: $scope.thongtinchung[0].NGAY_GIAO_HANG.format('DD/MM/YYYY'),
            DIA_DIEM_GIAO_HANG: $scope.thongtinchung[0].DIA_DIEM_GIAO_HANG,
            DA_XUAT_KHO: $scope.thongtinchung[0].DA_XUAT_KHO,
            DA_LAP_HOA_DON: $scope.thongtinchung[0].DA_LAP_HOA_DON,
        }

        $scope.arrayChiTietBH= [];

        for (var i = 0; i < $scope.Detail.ListAdd.length; i++) {


            var ChiTietBH = {
                ID: $scope.Detail.ListAdd[i].ID,
                MA_HANG: $scope.Detail.ListAdd[i].MA_HANG,
                MA_DIEU_CHINH: $scope.Detail.ListAdd[i].MA_DIEU_CHINH,
                SO_LUONG: $scope.Detail.ListAdd[i].SO_LUONG,
                DON_GIA: $scope.Detail.ListAdd[i].DON_GIA,
                THANH_TIEN_HANG: $scope.Detail.ListAdd[i].THANH_TIEN_HANG,
                DVT: $scope.Detail.ListAdd[i].DVT,
                DIEN_GIAI_THUE: $scope.Detail.ListAdd[i].DIEN_GIAI_THUE,
                THUE_GTGT: $scope.Detail.ListAdd[i].THUE_GTGT,
                TIEN_THUE_GTGT: $scope.Detail.ListAdd[i].TIEN_THUE_GTGT,
                TIEN_THANH_TOAN: $scope.Detail.ListAdd[i].TIEN_THANH_TOAN,
                TK_NO: $scope.Detail.ListAdd[i].TK_NO,
                TK_CO: $scope.Detail.ListAdd[i].TK_CO,
                TK_THUE: $scope.Detail.ListAdd[i].TK_THUE,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBH.push(ChiTietBH);
        }

        BanHangService.save_thongtinchungBH(url,data_save).then(function successCallback(response) {
            alert('Sửa thông tin chung thành công');

            for (var i = 0; i < $scope.arrayChiTietBH.length; i++) {
                $scope.arrayChiTietBH[i].MA_SO_BH = url;
            }


            if ($scope.arrayChiTietBH.length > 0) {
                $http({
                    method: 'PUT',
                    data: $scope.arrayChiTietBH,
                    url: window.location.origin + '/api/Api_ChiTietBanHang/PUTBH_CT_BAN_HANG'
                }).then(function successCallback(response) {
                    alert("Hoàn Thành Lưu");
                }, function errorCallback(response) {
                    alert('Không lưu được chi tiết đơn bán hàng');
                });
                return;
            }

        }, function errorCallback(response) {
            console.log(response);
            alert('Sự cố hệ thống, Không lưu được phiếu giữ kho, Bạn vui lòng liên hệ với admin để khắc phục ');
        });
    };

    $scope.CreateNhatKy = function (item) {
        $scope.item = item;
        $scope.Detail.ListNew.push({
            MA_HANG: $scope.item.MA_HANG,
            TIEN_THANH_TOAN: $scope.item.TIEN_THANH_TOAN,
            TK_CO: $scope.item.TK_CO,
            TK_NO: $scope.item.TK_NO,
            TK_THUE: $scope.item.TK_THUE,
            TIEN_THUE_GTGT: $scope.item.TIEN_THUE_GTGT,
            DIEN_GIAI_THUE: $scope.item.DIEN_GIAI_THUE,
        });
    };

    $scope.AddNew_NhatKy = function () {
        var url = document.location.href;
        //this removes the anchor at the end, if there is one
        url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
        //this removes the query after the file name, if there is one
        url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
        //this removes everything before the last slash in the path
        url = url.substring(url.lastIndexOf("/") + 1, url.length);
        //

        $scope.arrayChiTietBH = [];

        for (var i = 0; i < $scope.Detail.ListNew.length; i++) {
            var ChiTietBH = {
                ID: $scope.Detail.ListNew[i].ID,
                MA_HANG: $scope.Detail.ListNew[i].MA_HANG,
                TIEN_THANH_TOAN: $scope.Detail.ListNew[i].TIEN_THANH_TOAN,
                TK_NO: $scope.Detail.ListNew[i].TK_NO,
                TK_CO: $scope.Detail.ListNew[i].TK_CO,
                TK_THUE: $scope.Detail.ListNew[i].TK_THUE,
                TIEN_THUE_GTGT: $scope.Detail.ListNew[i].TIEN_THUE_GTGT,
                DIEN_GIAI_THUE: $scope.Detail.ListNew[i].DIEN_GIAI_THUE,
            }
            //PUSH ChiTietGiu VÀO MẢNG arrayChiTietGiu
            $scope.arrayChiTietBH.push(ChiTietBH);
        }

        $scope.SoNhatKy = {
            MA_SO_BH: url,
            NGAY_BH: $scope.thongtinchung[0].NGAY_BH.format('DD/MM/YYYY'),
            MA_KHACH_HANG: $scope.thongtinchung[0].MA_KHACH_HANG,
            TRUC_THUOC: 'HOPLONG',
            DIEN_GIAI_CHUNG: 'Bán hàng',
            ChiTietBH: $scope.arrayChiTietBH,
        }

        $http({
            method: 'POST',
            data: $scope.SoNhatKy,
            url: window.location.origin + '/api/Api_SoNhatKyChung/PostKT_SO_NHAT_KY_CHUNG'
        }).then(function successCallback(response) {
            alert("Lên sổ nhật ký chung thành công");
        }, function errorCallback(response) {
            alert('Lên sổ nhật ký chung thất bại');
        });
        return;       
    };

    $scope.load_thongtinchung_banhang();
    $http.get(window.location.origin + '/api/Api_KH/GET_KHACH_CUA_SALE/' + salehienthoi)

        .then(function (response) {
            $scope.list_khachhang = response.data;
        }, function (error) {
            console.log(error);
        });

    //get data nguoi giu
    $http.get(window.location.origin + '/api/Api_KH/GetAllSale')
         .then(function (response) {
             $scope.list_nhanvienql = response.data;
         }, function (error) {
             console.log(error);
         });


    $scope.hinhthuctt = ["Chuyển khoản", "Tiền mặt", "Trả tiền sau khi nhận hàng"];

    var mangso = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    function dochangchuc(so, daydu) {
        var chuoi = "";
        chuc = Math.floor(so / 10);
        donvi = so % 10;
        if (chuc > 1) {
            chuoi = " " + mangso[chuc] + " mươi";
            if (donvi == 1) {
                chuoi += " mốt";
            }
        } else if (chuc == 1) {
            chuoi = " mười";
            if (donvi == 1) {
                chuoi += " một";
            }
        } else if (daydu && donvi > 0) {
            chuoi = " lẻ";
        }
        if (donvi == 5 && chuc >= 1) {
            chuoi += " lăm";
        } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
            chuoi += " " + mangso[donvi];
        }
        return chuoi;
    }
    function docblock(so, daydu) {
        var chuoi = "";
        tram = Math.floor(so / 100);
        so = so % 100;
        if (daydu || tram > 0) {
            chuoi = " " + mangso[tram] + " trăm";
            chuoi += dochangchuc(so, true);
        } else {
            chuoi = dochangchuc(so, false);
        }
        return chuoi;
    }
    function dochangtrieu(so, daydu) {
        var chuoi = "";
        trieu = Math.floor(so / 1000000);
        so = so % 1000000;
        if (trieu > 0) {
            chuoi = docblock(trieu, daydu) + " triệu";
            daydu = true;
        }
        nghin = Math.floor(so / 1000);
        so = so % 1000;
        if (nghin > 0) {
            chuoi += docblock(nghin, daydu) + " nghìn";
            daydu = true;
        }
        if (so > 0) {
            chuoi += docblock(so, daydu);
        }
        return chuoi;
    }
    function docso(so) {
        if (so == 0) return mangso[0];
        var chuoi = "", hauto = "";
        do {
            ty = so % 1000000000;
            so = Math.floor(so / 1000000000);
            if (so > 0) {
                chuoi = dochangtrieu(ty, true) + hauto + chuoi;
            } else {
                chuoi = dochangtrieu(ty, false) + hauto + chuoi;
            }
            hauto = " tỷ";
        } while (so > 0);
        return chuoi;
    }


});
app.directive('date', function (dateFilter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {

            var dateFormat = attrs['date'] || 'dd/MM/yyyy';

            ctrl.$formatters.unshift(function (modelValue) {
                return dateFilter(modelValue, dateFormat);
            });
        }
    };
});

app.directive("datepicker", function () {
    return {
        restrict: "A",
        scope: false,
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (date) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(date);
                });
            };
            var options = {
                onSelect: function (dateText) {
                    console.log(dateText);
                    updateModel(dateText);
                }
            };
            elem.datetimepicker({ format: 'DD/MM/YYYY' }).on('dp.change', function (data) {
                console.log('xxxxxxxxxxxxxxxx');
                console.log(data.date);
                updateModel(data.date);
            });
        }
    }
});
