﻿
    app.controller('ctrlThuKhac', ctrlThuKhac);
    ctrlThuKhac.$inject = ['$rootScope', '$scope', "$location", '$http', '$uibModal'];
    function ctrlThuKhac($rootScope, $scope, $location, $http, $uibModal) {

        function ErrorSystem() {
            new PNotify({
                title: 'Thất bại',
                text: 'Lỗi hệ thống, Xin vui lòng thử lại sau',
                addclass: 'bg-danger'
            });
        }
        function ConnectFail() {
            new PNotify({
                title: 'Thông báo',
                text: 'Không thể kết nối được server. Vui lòng kiểm tra đường truyền mạng và thử lại',
                addclass: 'bg-danger'
            });
        }
        function InputFail() {
            new PNotify({
                title: 'Thất bại',
                text: 'Dữ liệu nhập vào sai. Kiểm tra lại các trường dữ liệu kho và chi tiết số lượng kho hàng của hàng hóa',
                addclass: 'bg-warning'
            });
        }
        function Success() {
            new PNotify({
                title: 'Thành công',
                text: 'Xử lý dữ liệu thành công.',
                addclass: 'bg-primary'
            });
        }
        function Norecord() {

            new PNotify({
                title: 'Thông tin',
                text: 'Không có dữ liệu phù hợp được tìm thây',
                addclass: 'alert alert-styled-left',
                type: 'info'
            });
        }
        function ConvertToDate(input) {
            var date = input.split("/");
            return date[2] * 365 + date[1] * 12 + date[0];
        }
        $('body').click(function (event) {
            if ($(event.target).is('.tableselect') == false && $(event.target).is('.showtableselect') == false) {
                $(".tableselect").css({ "display": "none" });
            }
        });


        $scope.GiaTriThamChieu = [];
        $scope.GiaTriChungTu = {
            Search: null,
            Date: null
        };
        
        $scope.Validate = {
            FromDateThamChieu: true,
            ToDateThamChieu: true,
            ToDateThamChieuLess: true,
            LoaiChungTu: true,
            GiaTriChungTu: true

        };
        $scope.ThamChieu = {
            From: null,
            To: null,
            ListResult: [],
            ListSelect: [],
            TraHang: null
        };

        $rootScope.PageSetting = {
            PageCount: 0,
            NumberPerPage: 10,
            CurrentPage: 1
        }
        $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
        $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);

        //array tổng hợp
        $scope.arrayTongHop = {
            ma_doi_tuong: '',
            ma_cong_ty: '',
            ten_doi_tuong: '',
            nguoi_nop: '',
            dia_chi: '',
            ten_ngan_hang: '',
            ly_do_thu: '',
            dien_giai_ly_do_nop: '',
            nhan_vien_thu: '',
            HO_VA_TEN: '',
            ma_phong_ban: '',
            nguoi_lap_bieu: '',
            ho_va_ten_lap_bieu: '',
            ngay_hach_toan: '',
            ngay_chung_tu: '',
            SoChungTu: '',
            tong_tien: 0
        };


        $scope.arraydiengiai = [{
            LOAI_TIEN: 'VND',
            TY_GIA: '',
            TK_NO: 1111,
            TK_CO: '',
            SO_TIEN: 0,
            QUY_DOI: 0,
            DIEN_GIAI: 'Thu Khác',
            TK_NGAN_HANG: ''
        }];

        $scope.arrayCTTC = [];

        $scope.indexcurrent = 0;

        //method change type reason.
        $scope.reasonmoney = 'Thu Khác';
        $scope.arrayTongHop.dien_giai_ly_do_nop = $scope.reasonmoney;


        //mảng đối tượng
        $scope.arrayDTFinded = [];
        $scope.arrayDT = [];
        $scope.showtable_ma_doi_tuong = false;
        $scope.hovertable = false;
        $scope.hoverbtn_MDT = false;

        //save value TK ngân hàng
        $scope.arrayBanks = [];
        $scope.sotk_no = '';
        $scope.sotk_co = '';
        $scope.loadedDMTKTD = false;

        //save nhân viên
        $scope.arrayStaffs = [];
        $scope.staffThu = '';

        //phần tham chiếu chứng từ:
        $scope.usingchoise_CTTC = true;
        $scope.chung_tu_selected = '';

        //nguoi lạp bieu
        $scope.staffLapBieu = '';

        //array tk hack toan
        $scope.arrayBankHackToan = [];
        $scope.bankTKNo = {};
        $scope.bankTKCo = {};

        //chứng từ tham chiếu
        $scope.ma_chung_tu_tham_chieu = '';

        //nhà cung cấp
        $scope.arrayNCC = [];

        function ResetAfterSave() {
            $scope.GiaTriThamChieu = [];
            $scope.numPerPage = angular.copy($rootScope.PageSetting.NumberPerPage);
            $scope.currentPage = angular.copy($rootScope.PageSetting.CurrentPage);
            $scope.GiaTriChungTu.Search = null,
            $scope.GiaTriChungTu.Date = null;
            $scope.arrayTongHop.ngay_hach_toan = null;
            $scope.arrayTongHop.ngay_chung_tu = null;
            $scope.arrayTongHop.SoChungTu = null;
            $scope.arrayTongHop.dien_giai_ly_do_nop = null;
            $scope.arrayTongHop.ma_doi_tuong = null;
            $scope.arrayTongHop.ten_doi_tuong = null;
            $scope.arrayTongHop.dia_chi = null;
            $scope.arrayTongHop.nguoi_nop = null;
            $scope.reasonmoney = null;
            $scope.arrayTongHop.ho_va_ten = null;
            $scope.arrayTongHop.nhan_vien_thu = null;
            $scope.arraydiengiai = [];
            $scope.Validate.ToDateThamChieu = true;
            $scope.Validate.ToDateThamChieuLess = true;
            $scope.Validate.LoaiChungTu = true;
            $scope.Validate.GiaTriChungTu = true;
            $scope.ThamChieu.From = null;
            $scope.ThamChieu.To = null;
            $scope.ThamChieu.ListResult = [];
            $scope.ThamChieu.ListSelect = [];

        }
        // ngày hiện tại 
        $(function () {

            $('#ngay_hach_toan').datetimepicker({
                format: 'DD/MM/YYYY',
                defaultDate: moment(),
                sideBySide: true
            });
            $('#ngay_chung_tu').datetimepicker({
                format: 'DD/MM/YYYY',
                defaultDate: moment(),
                sideBySide: true
            });
        });
        $scope.test_ = function () {
            var abc = $('#ngay_chung_tu').val();
            console.log(abc);
        };

        /**
        *Tìm Tài khoản tự động
        */
        //$http.get(window.location.origin + '/api/DM_DINH_KHOAN_TU_DONG/MA_LOAI_CHUNG_TU/THU')
        // .then(function (response) {
        //     if (response.data) {
        //         $scope.sotk_no = response.data.tk_no;
        //         $scope.sotk_co = response.data.tk_co;
        //         $scope.arraydiengiai[$scope.indexcurrent].tk_co = $scope.sotk_co;
        //         $scope.arraydiengiai[$scope.indexcurrent].tk_no = $scope.sotk_no;
        //         $scope.loadedDMTKTD = true;
        //     } else {
        //         $scope.loadedDMTKTD = true;
        //     }
        // }, function (error) {
        //     $scope.loadedDMTKTD = true;
        // });

      

        /**
        * get tk ngân hàng
        */
        $http.get(window.location.origin + '/api/Api_LoaiTKnganhangnoibo')
         .then(function (response) {
             if (response.data) {
                 $scope.arrayBanks = response.data;
             }
         }, function (error) {
             console.log(error);
         });

        /**
        * get nhan viên
        */
        $http.get(window.location.origin + '/api/Api_NhanvienHL/GetListNhanvien')
             .then(function (response) {
                 if (response.data) {
                     $scope.arrayStaffs = response.data;
                     $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });

        /**
        * get tài khoản hạch toán
        */
        $http.get(window.location.origin + '/api/Api_TaiKhoanHachToan')
         .then(function (response) {
             if (response.data) {
                 $scope.arrayBankHackToan = response.data;
             }
         }, function (error) {
             console.log(error);
         });

        /**
        *loc dữ liệu khi input thay đổi
        */
        $scope.onDoiTuongFind = function () {
            $http.post(window.location.origin + '/api/Api_XuatNhapKho/GetAllDoiTuong/' + $scope.arrayTongHop.ma_doi_tuong)
             .then(function (response) {
                 console.log(response);
                 if (response.data) {
                     $scope.arrayDT = response.data;
                     $scope.arrayDTFinded = $scope.arrayDT.map(function (item) {
                         return item;
                     });
                 }
             }, function (error) {
                 console.log(error);
             });
        }
        $scope.onBlurInput_MDT = function () {
            if ($scope.hoverbtn_MDT || $scope.hovertable_MDT) {
                return;
            }
            $scope.showtable_ma_doi_tuong = false;
        }

        /**
    *loc dữ liệu khi input nhân viên thay đổi
    */
        $scope.onNhanVienFind = function () {
            if (!$scope.HO_VA_TEN) {
                $scope.arrayNVFinded = $scope.arrayStaffs.map(function (item) {
                    return item;
                });
            }
            $scope.arrayNVFinded = $scope.arrayStaffs.filter(function (item) {
                if (item.HO_VA_TEN.toLowerCase().indexOf($scope.arrayTongHop.ho_va_ten.toLowerCase()) >= 0) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        /**
        *Show tên nhân viên
    */
        $scope.showInfoStaff = function (p_staff) {
            $scope.arrayTongHop.nhan_vien_thu = p_staff.USERNAME;
            $scope.arrayTongHop.ho_va_ten = p_staff.HO_VA_TEN;
            $scope.arrayTongHop.ma_phong_ban = p_staff.MA_PHONG_BAN;
            $scope.showtable_ho_va_ten = false;
        }

        

        /*
     * method show info Đối Tượng Khi user lựa chọn.
     */
        $scope.showInfoDT = function (p_dt) {
            $scope.arrayTongHop.ma_doi_tuong = p_dt.MA_DOI_TUONG;
            $scope.arrayTongHop.ma_cong_ty = p_dt.MA_CONG_TY;
            $scope.arrayTongHop.ten_doi_tuong = p_dt.TEN_DOI_TUONG;
            $scope.arrayTongHop.dia_chi = p_dt.DIA_CHI_XUAT_HOA_DON;
            $scope.hovertable = false;
            $scope.showtable_ma_doi_tuong = false;
        }

        /**
        * method show thông tin tk
        */
        //$scope.showInfoTK = function (p_bank) {
        //    $scope.arrayTongHop.so_tk_nop = p_bank.so_tai_khoan;
        //    $scope.arrayTongHop.ten_ngan_hang = p_bank.ten_ngan_hang;
        //}

        /**
        *chọn tk nợ
        */
        $scope.showInfoTKNo = function (p_tkno) {
            $scope.arraydiengiai[$scope.indexcurrent].TK_NO = p_tkno.SO_TK;
        }

        /**
        * chọn tk có
        */
        $scope.showInfoTKCo = function (p_tkco) {
            $scope.arraydiengiai[$scope.indexcurrent].TK_CO = p_tkco.SO_TK;
        }

        /**
      * chọn tai khoan ngan hang
      */
        $scope.showInfoTKNH = function (p_bank) {
            $scope.arraydiengiai[$scope.indexcurrent].TK_NGAN_HANG = p_bank.SO_TAI_KHOAN;
        }

        /**
       * Thêm mới code
       */
        $scope.addTongHop = function () {
            $scope.sotk_no = 1111;
            $scope.arraydiengiai.push({
                LOAI_TIEN: 'VND',
                TY_GIA: 1,
                TK_NO: $scope.sotk_no,
                TK_CO: $scope.sotk_co,
                SO_TIEN: '',
                QUY_DOI: '',
                DIEN_GIAI: 'Thu Khác',
                TK_NGAN_HANG: ''
            });
            $scope.indexcurrent = $scope.arraydiengiai.length - 1;
        }

        $scope.onChangeIndex = function (p_index) {
            $scope.indexcurrent = p_index;
        }


    
        $scope.onSave = function () {
            if (!$scope.arrayTongHop.ma_doi_tuong) {
                alert('Thiếu thông tin Mã Đối Tượng');
                return;
            }

            if (!$scope.arrayTongHop.dien_giai_ly_do_nop) {
                alert('Thiếu thông tin Diễn Giải Lý Do Nộp');
                return;
            }

            

            var ngaychungtu = $('#ngay_chung_tu').val();
            var ngayhachtoan = $('#ngay_hach_toan').val();
            if (!ngayhachtoan) {
                alert('Thiếu thông tin Ngày Hạch Toán');
                return;
            }

            if (!ngaychungtu) {
                alert('Thiếu thông tin Ngày Chứng Từ');
                return;
            }
            if (ngayhachtoan < ngaychungtu) {
                alert('Ngày Hạch Toán phải lớn hơn hoặc bằng Ngày Chứng Từ');
                return;
            }


            var tongtien = 0;
            for (var i = 0; i < $scope.arraydiengiai.length; i++) {
                if (!$scope.arraydiengiai[i].LOAI_TIEN) {
                    alert('Thiếu thông tin Loại Tiền - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].TK_NO) {
                    alert('Thiếu thông tin Tài Khoản Nợ - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].TK_CO) {
                    alert('Thiếu thông tin Tài Khoản Có - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].SO_TIEN) {
                    alert('Thiếu thông tin Số Tiền - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if ($scope.arraydiengiai[i].LOAI_TIEN == 'VND') {
                    $scope.arraydiengiai[i].TY_GIA = 1;
                }

                if (!$scope.arraydiengiai[i].TY_GIA) {
                    alert('Thiếu thông tin Tỷ Giá - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }

                if (!$scope.arraydiengiai[i].DIEN_GIAI) {
                    alert('Thiếu thông tin Diễn Giải - Bảng Diễn Giải hàng ' + (i + 1));
                    return;
                }
                console.log($scope.arraydiengiai[i].so_tien);
                console.log($scope.arraydiengiai[i].ty_gia);
                $scope.arraydiengiai[i].QUY_DOI = $scope.arraydiengiai[i].SO_TIEN * $scope.arraydiengiai[i].TY_GIA;
                tongtien += $scope.arraydiengiai[i].QUY_DOI;
            }
            $scope.arrayTongHop.tong_tien = tongtien;


            var a = $('#username').val();
            var b = $('#macongty').val();
            $http({
                method: 'POST',
                url: '/api/Api_QUY_PHIEU_THU/PostQUY_PHIEUTHU',
                data: {
                    SO_CHUNG_TU: $scope.arrayTongHop.SoChungTu,
                    NGAY_CHUNG_TU: ngaychungtu,
                    NGAY_HACH_TOAN: ngayhachtoan,
                    MA_DOI_TUONG: $scope.arrayTongHop.ma_doi_tuong,
                    ChiTietQPT: $scope.arraydiengiai,
                    ThamChieu: $scope.ThamChieu.ListSelect,
                    LY_DO_NOP: 'Thu khác',
                    NGUOI_NOP: $scope.arrayTongHop.nguoi_nop,
                    DIEN_GIAI_LY_DO_NOP: $scope.arrayTongHop.dien_giai_ly_do_nop,
                    NHAN_VIEN_THU: $scope.arrayTongHop.nhan_vien_thu,
                    TONG_TIEN: $scope.arrayTongHop.tong_tien,
                    NGUOI_LAP_BIEU: a,
                    TRUC_THUOC: b,



                }
            }).then(function (response) {
                $scope.data1 = response.data;
                if (!$scope.data1) {
                    ErrorSystem();
                }


                else {
                    ResetAfterSave();
                    new PNotify({
                        title: 'Thành công',
                        text: 'Chứng từ ' + $scope.data1 + ' đã được tạo',
                        addclass: 'bg-primary'
                    });
                }
            }, function (error) {
                ConnectFail();
            });
        }

        $scope.onHuy = function () {
            window.location.href = window.location.origin + '/PhieuThuTienMat/' + $scope.reasonmoney;
        }

        $scope.checklydo = function () {
            var value = $('#lydothu').val();
            $('#diengiai').val(value);
        };
        //Hiển thị ô giá trị chứng từ
        $scope.ShowDataGiaTriChungTu = function () {
            if ($scope.LoaiChungTu == 2 && $("#DataGiaTriChungTu").css("display") == "none") {
                $("#DataGiaTriChungTu").css({ "display": "block" });
            }
            else {
                $("#DataGiaTriChungTu").css({ "display": "none" });
            }
        }
        //End 



        //Chọn giá trị chứng từ
        $scope.SelectDataGiaTriChungTu = function (item) {
            $scope.GiaTriChungTu.Data = item;
            $scope.GiaTriChungTu.Search = item.tendoituong;
            $("#DataGiaTriChungTu").css({ "display": "none" });
        }
        //end


        //Thay đổi loại chứng từ
        $scope.ChangeLoaiChungTu = function () {

            if ($scope.LoaiChungTu == 1) {
                $("#Select_DataGiaTriChungTu").css({ "display": "block" });
                $("#Input_DataGiaTriChungTu").css({ "display": "none" });
                $("#Input_MaChungTu").css({ "display": "none" });
                $("#DataGiaTriChungTu").css({ "display": "none" });
                $http({
                    method: 'GET',
                    url: '/api/Api_Loaichungtu'
                }).then(function (response) {
                    if (typeof (response.data) == "object") {
                        $scope.GiaTriThamChieu = [];
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.GiaTriThamChieu.push({
                                "value": response.data[i].MA_LOAI_CHUNG_TU,
                                "show": response.data[i].TEN_LOAI_CHUNG_TU
                            });
                        }
                    }
                    else {
                        ErrorSystem();
                    }
                }, function (error) {
                    ConnectFail();
                });
            }
            else if ($scope.LoaiChungTu == 2) {
                $("#Select_DataGiaTriChungTu").css({ "display": "none" });
                $("#Input_DataGiaTriChungTu").css({ "display": "block" });
                $("#Input_MaChungTu").css({ "display": "none" });
                $("#DataGiaTriChungTu").css({ "display": "block" });
                $scope.DoiTuongFind = function () {
                    $http.post(window.location.origin + '/api/Api_XuatNhapKho/GetAllDoiTuong/' + $scope.GiaTriChungTu.Search)
                     .then(function (response) {
                         if (typeof (response.data) == "object") {
                             var data = response.data.DoiTuong;
                             var colength = 5;
                             var madoituong = "", tendoituong = "";
                             var max = 0;
                             var maxlength = response.data.Length;
                             for (var i = 0; i < response.data.length; i++) {
                                 madoituong = response.data[i].MA_DOI_TUONG;
                                 tendoituong = response.data[i].TEN_DOI_TUONG;
                                 $scope.GiaTriThamChieu.push({
                                     value: response.data[i].MA_DOI_TUONG,
                                     show: "",
                                     madoituong: madoituong,
                                     tendoituong: tendoituong,
                                 });
                             }
                         }
                         else {
                             ErrorSystem();
                         }
                     }, function (error) {
                         console.log(error);
                     });
                }

                    
            }
            else if ($scope.LoaiChungTu == 3) {
                $("#Select_DataGiaTriChungTu").css({ "display": "none" });
                $("#Input_DataGiaTriChungTu").css({ "display": "none" });
                $("#Input_MaChungTu").css({ "display": "block" });
                $("#DataGiaTriChungTu").css({ "display": "none" });

            }
        };
        //End

        $scope.SearchThamChieu = function () {
            if (CheckSearchThamChieu() == false) {
                return;
            }
            if ($scope.LoaiChungTu == 1) {
                var data = {
                    GiaTriChungTu: $scope.GiaTriLoaiChungTu,
                    FromTime: $scope.ThamChieu.From,
                    ToTime: $scope.ThamChieu.To


                }

                $http.post('/api/Api_XuatNhapKho/SearchByTypeWithDate', data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ThamChieu.ListResult = response.data;
                        if ($scope.ThamChieu.ListResult.length == 0) {
                            Norecord();
                        }
                    }
                    else {
                        ErrorSystem();
                    }
                }, function (error) {
                    ConnectFail();
                });



                //$http({
                //    method: 'POST',
                //    url: '/api/Api_XuatNhapKho/SearchByType/' + GiaTriChungTu + '/' + FromTime + '/' + ToTime,
                //    data: { FromTime: $scope.ThamChieu.From, ToTime: $scope.ThamChieu.To, GiaTriChungTu: $scope.GiaTriLoaiChungTu }
                //}).then(function (response) {
                //    console.log(response);
                //    if (typeof (response.data) == "object") {
                //        $scope.ThamChieu.ListResult = response.data;
                //        if ($scope.ThamChieu.ListResult.length == 0) {
                //            Norecord();
                //        }
                //    }
                //    else {
                //        ErrorSystem();
                //    }
                //}, function (error) {
                //    ConnectFail();
                //});
            }
            else if ($scope.LoaiChungTu == 2) {
                var data = {
                    GiaTriChungTu: $scope.GiaTriChungTu.Data.madoituong,
                    FromTime: $scope.ThamChieu.From,
                    ToTime: $scope.ThamChieu.To

                }

                $http.post('/api/Api_XuatNhapKho/SearchByDoiTuongWithDate', data)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ThamChieu.ListResult = response.data;
                        if ($scope.ThamChieu.ListResult.length == 0) {
                            Norecord();
                        }
                    }
                    else {
                        ErrorSystem();
                    }
                }, function (error) {
                    ConnectFail();
                });
            }
            else {
                var mact = $scope.MaChungTu.Search;
                $http.get('/api/Api_XuatNhapKho/GetbyMa/' + mact)
                .then(function (response) {
                    console.log(response);
                    if (typeof (response.data) == "object") {
                        $scope.ThamChieu.ListResult = response.data;
                        if ($scope.ThamChieu.ListResult.length == 0) {
                            Norecord();
                        }
                    }
                    else {
                        ErrorSystem();
                    }
                }, function (error) {
                    ConnectFail();
                });
            }
        };
        function CheckSearchThamChieu() {
            $scope.ThamChieu.From = $("#ThamChieuFrom").val();
            $scope.ThamChieu.To = $("#ThamChieuTo").val();
            var check = true;
            if ($scope.LoaiChungTu == null) {
                $scope.Validate.LoaiChungTu = false;
                check = false;
            }
            else {
                $scope.Validate.LoaiChungTu = true;
            }
            if (($scope.LoaiChungTu == 2 && $scope.GiaTriChungTu.Data == null) || ($scope.LoaiChungTu == 1 && $scope.GiaTriLoaiChungTu == null) || ($scope.LoaiChungTu == 3 && $scope.MaChungTu.Search == null)) {
                $scope.Validate.GiaTriChungTu = false;
                check = false;
            }
            else {
                $scope.Validate.GiaTriChungTu = true;
            }
            if ($scope.ThamChieu.From != "" && $scope.ThamChieu.To != "" && ConvertToDate($scope.ThamChieu.From) > ConvertToDate($scope.ThamChieu.To)) {
                $scope.Validate.ToDateThamChieuLess = false;
                check = false;
            }
            else {
                $scope.Validate.ToDateThamChieuLess = true;
            }
            return check;
        };
        $scope.SelectThamChieu = function (item, index) {
            if (item.Action == true) {
                item.Action = false;
            }
            else {
                item.Action = true;

            }
        };
        $scope.RemoveThamChieu = function (index) {
            $scope.ThamChieu.ListSelect.splice(index, 1);
            if ($scope.LoadHangTra == true) {
                ResetAfterSave();
            }
        }

        $scope.RemoveRow = function (index) {
            $scope.arraydiengiai.splice(index, 1);
            ResetAfterSave();
        }
        $scope.SetThamChieu = function () {
            var length = $scope.ThamChieu.ListResult.length;
            //$scope.ThamChieu.ListSelect = [];
            var check = false;
            for (var i = 0; i < length; i++) {
                if ($scope.ThamChieu.ListResult[i].Action == true) {
                    check = false;
                    for (var j = 0; j < $scope.ThamChieu.ListSelect.length; j++) {
                        if ($scope.ThamChieu.ListSelect[j].SO_CHUNG_TU == $scope.ThamChieu.ListResult[i].SO_CHUNG_TU) {
                            check = true;
                            break;
                        }
                    }
                    if (!check) {

                        $scope.ThamChieu.ListSelect.push(angular.copy($scope.ThamChieu.ListResult[i]));
                    }
                }
            }
            $("#modal_theme_primary").modal("toggle");
            ResetThamChieu();
        };
        function ResetThamChieu() {
            $("#ThamChieuFrom").val("");
            $("#ThamChieuTo").val("");
            $scope.ThamChieu.ListResult = [];
        };

        //Định dạng số tiền
        
    }
