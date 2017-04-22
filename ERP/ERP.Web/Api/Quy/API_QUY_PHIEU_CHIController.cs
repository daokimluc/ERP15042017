﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ERP.Web.Models.Database;
using System.Text.RegularExpressions;
using ERP.Web.Models.NewModels.Quy;
using ERP.Web.Common;
using ERP.Web.Models.NewModels.All;

namespace ERP.Web.Api.Quy
{
    public class API_QUY_PHIEU_CHIController : ApiController
    {
        private ERP_DATABASEEntities db = new ERP_DATABASEEntities();

        // GET: api/API_QUY_PHIEU_CHI
        public IQueryable<QUY_PHIEU_CHI> GetQUY_PHIEU_CHI()
        {
            return db.QUY_PHIEU_CHI;
        }

        // GET: api/API_QUY_PHIEU_CHI/5
        [ResponseType(typeof(QUY_PHIEU_CHI))]
        public IHttpActionResult GetQUY_PHIEU_CHI(string id)
        {
            QUY_PHIEU_CHI qUY_PHIEU_CHI = db.QUY_PHIEU_CHI.Find(id);
            if (qUY_PHIEU_CHI == null)
            {
                return NotFound();
            }

            return Ok(qUY_PHIEU_CHI);
        }

        // PUT: api/API_QUY_PHIEU_CHI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutQUY_PHIEU_CHI(string id, QUY_PHIEU_CHI qUY_PHIEU_CHI)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != qUY_PHIEU_CHI.SO_CHUNG_TU)
            {
                return BadRequest();
            }

            db.Entry(qUY_PHIEU_CHI).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QUY_PHIEU_CHIExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        public string AutoMA_DU_KIEN()
        {
            Regex digitsOnly = new Regex(@"[^\d]");
            string year = DateTime.Now.Year.ToString().Substring(2, 2);
            string month = DateTime.Now.Month.ToString();
            string day = DateTime.Now.Day.ToString();
            if (month.Length == 1)
            {
                month = "0" + month;
            }
            if (day.Length == 1)
            {
                day = "0" + day;
            }
            string prefixNumber = "PC" + year.ToString() + month.ToString() + day.ToString();
            string SoChungTu = (from nhapkho in db.QUY_PHIEU_CHI where nhapkho.SO_CHUNG_TU.Contains(prefixNumber) select nhapkho.SO_CHUNG_TU).Max();


            if (SoChungTu == null)
            {
                return "PC" + year + month + day + "0001";
            }
            SoChungTu = SoChungTu.Substring(8, SoChungTu.Length - 8);
            string number = (Convert.ToInt32(digitsOnly.Replace(SoChungTu, "")) + 1).ToString();
            string result = number.ToString();
            int count = 4 - number.ToString().Length;
            for (int i = 0; i < count; i++)
            {
                result = "0" + result;
            }
            return "PC" + year + month + day + result;
        }
        // POST: api/API_QUY_PHIEU_CHI
        [HttpPost]
        [Route("api/API_QUY_PHIEU_CHI/PostQUY_PHIEUCHI")]
        [ResponseType(typeof(QUY_PHIEU_CHI))]

        public IHttpActionResult PostQUY_PHIEUCHI(QuyPhieuChi quy_phieuchi)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            //Lưu thông tin nhập kho
            QUY_PHIEU_CHI qpc = new QUY_PHIEU_CHI();
            qpc.NGAY_CHUNG_TU = GeneralFunction.ConvertToTime(quy_phieuchi.NGAY_CHUNG_TU);
            qpc.NGAY_HACH_TOAN = GeneralFunction.ConvertToTime(quy_phieuchi.NGAY_HACH_TOAN);
            qpc.SO_CHUNG_TU = AutoMA_DU_KIEN();
            qpc.MA_DOI_TUONG = quy_phieuchi.MA_DOI_TUONG;
            qpc.LY_DO_CHI = quy_phieuchi.LY_DO_CHI;
            qpc.DIEN_GIAI_LY_DO_CHI = quy_phieuchi.DIEN_GIAI_LY_DO_CHI;
            qpc.NGUOI_NHAN = quy_phieuchi.NGUOI_NHAN;
            qpc.NHAN_VIEN_MUA_HANG = quy_phieuchi.NHAN_VIEN_MUA_HANG;
            qpc.NGUOI_LAP_BIEU = quy_phieuchi.NGUOI_LAP_BIEU;
            qpc.TRUC_THUOC = "HOPLONG";
            db.QUY_PHIEU_CHI.Add(qpc);

            //Lưu thông tin tham chiếu
            if (quy_phieuchi.ThamChieu.Count > 0)
            {
                foreach (ThamChieu item in quy_phieuchi.ThamChieu)
                {
                    XL_THAM_CHIEU_CHUNG_TU newItem = new XL_THAM_CHIEU_CHUNG_TU();
                    newItem.SO_CHUNG_TU_GOC = qpc.SO_CHUNG_TU;
                    newItem.SO_CHUNG_TU_THAM_CHIEU = item.SO_CHUNG_TU;
                    db.XL_THAM_CHIEU_CHUNG_TU.Add(newItem);
                }
            }
            //Lưu chi tiết
            decimal tongtien = 0;
            //TONKHO_HOPLONG HHTon = new TONKHO_HOPLONG();
            //HH_NHOM_VTHH NhomHang = new HH_NHOM_VTHH();
            if (quy_phieuchi.ChiTietQPC != null && quy_phieuchi.ChiTietQPC.Count > 0)
            {
                foreach (ChiTietQuyPhieuChi item in quy_phieuchi.ChiTietQPC)
                {
                    QUY_CT_PHIEU_CHI newItem = new QUY_CT_PHIEU_CHI();
                    newItem.SO_CHUNG_TU = qpc.SO_CHUNG_TU;
                    newItem.DIEN_GIAI = item.DIEN_GIAI;
                    newItem.LOAI_TIEN = item.LOAI_TIEN;
                    newItem.TK_CO = item.TK_CO;
                    newItem.TK_NO = item.TK_NO;
                    newItem.SO_TIEN = Convert.ToDecimal(item.SO_TIEN);
                    newItem.TY_GIA = Convert.ToInt32(item.TY_GIA);
                    newItem.QUY_DOI = newItem.SO_TIEN * newItem.TY_GIA;
                    tongtien += newItem.QUY_DOI;
                    newItem.MA_DOI_TUONG = qpc.MA_DOI_TUONG;
                    newItem.TK_NGAN_HANG = item.TK_NGAN_HANG;
                    newItem.DIEN_GIAI_THUE = item.DIEN_GIAI_THUE;
                    newItem.TK_THUE_GTGT = item.TK_THUE_GTGT;
                    newItem.TIEN_THUE_GTGT = Convert.ToDecimal(item.TIEN_THUE_GTGT);
                    newItem.CK_THUE_GTGT = item.CK_THUE_GTGT;
                    newItem.GIA_TRI_HHDV_CHUA_THUE = Convert.ToDecimal(item.GIA_TRI_HHDV_CHUA_THUE);
                    newItem.NGAY_HD = Convert.ToDateTime(item.NGAY_HD);
                    newItem.SO_HD = item.SO_HD;
                    newItem.MAU_SO_HD = item.MAU_SO_HD;
                    newItem.KY_HIEU_HD = item.KY_HIEU_HD;
                    newItem.MA_NHA_CUNG_CAP = qpc.MA_DOI_TUONG;
                    db.QUY_CT_PHIEU_CHI.Add(newItem);


                }
            }

            qpc.TONG_TIEN = tongtien;



            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (QUY_PHIEU_CHIExists(quy_phieuchi.SO_CHUNG_TU))
                {
                    return Conflict();
                }
                else

                    throw;

            }


            return Ok(qpc.SO_CHUNG_TU);

        }

        // DELETE: api/API_QUY_PHIEU_CHI/5
        [ResponseType(typeof(QUY_PHIEU_CHI))]
        public IHttpActionResult DeleteQUY_PHIEU_CHI(string id)
        {
            QUY_PHIEU_CHI qUY_PHIEU_CHI = db.QUY_PHIEU_CHI.Find(id);
            if (qUY_PHIEU_CHI == null)
            {
                return NotFound();
            }

            db.QUY_PHIEU_CHI.Remove(qUY_PHIEU_CHI);
            db.SaveChanges();

            return Ok(qUY_PHIEU_CHI);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QUY_PHIEU_CHIExists(string id)
        {
            return db.QUY_PHIEU_CHI.Count(e => e.SO_CHUNG_TU == id) > 0;
        }
    }
}